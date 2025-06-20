import React, { useContext, useState } from 'react'
import { Button } from '../../../components/ui/button'
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg'
import { Loader, Sparkles } from 'lucide-react';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
import { toast } from 'sonner';
import { AIChatSession } from '../../../../service/AIModel';

const prompt='position titile: {title} , Depends on position title give me 4-5 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags'

function RichTextEditor({onRichTextEditorChange, index, defaultValue}) {
    const [value, setValue] = useState(defaultValue);
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);

    const GenerateSummary = async () => {
  setLoading(true);

  if (!resumeInfo?.experience[index]?.title) {
    toast('Please Add Position Title');
    setLoading(false);
    return;
  }

  const PROMPT = prompt.replace('{title}', resumeInfo?.experience[index]?.title);

  try {
    const result = await AIChatSession.sendMessage(PROMPT);
    const rawText = await result.response.text();

    // Clean unwanted characters
    const cleanedText = rawText
      .replaceAll('[', '')
      .replaceAll(']', '')
      .replaceAll('{', '')
      .replaceAll('}', '')
      .replaceAll('bulletPoints', '')
      .replaceAll('description', '')
      .replaceAll(':', '')
      .replaceAll('"', '');

    const lines = cleanedText.split('\n').map(line => line.trim()).filter(line => line);
    
    const isBulletList = lines.some(line => line.startsWith('-') || line.startsWith('•'));

    const htmlFormatted = isBulletList
      ? `<ul>${lines.map(line =>
          `<li>${line.replace(/^[-•]\s*/, '')}</li>`).join('')}</ul>`
      : `<p>${lines.join(' ')}</p>`;

    setValue(htmlFormatted);

    onRichTextEditorChange({ target: { value: htmlFormatted } });
    
  } catch (err) {
    toast('Failed to generate summary.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
        <div className='flex justify-between m-2'>
            <label className='text-xs'>Summary</label>
            
            <Button
                          type='button'
                          size='sm'
                          variant='outline'
                          className='border-primary text-primary flex items-center gap-2'
                          onClick={GenerateSummary}
                        >
                          <Sparkles className='w-4 h-4' />
                          Generate from AI
                        </Button>
        </div>
        <EditorProvider>
            <Editor value={value} onChange={(e)=>{
                setValue(e.target.value);
                onRichTextEditorChange(e);
            }}>
                <Toolbar>
                    <BtnBold/>
                    <BtnItalic/>
                    <Separator/>
                    <BtnUnderline/>
                    <BtnStrikeThrough/>
                    <Separator/>
                    <BtnLink/>
                </Toolbar>
            </Editor>
        </EditorProvider>
    </div>
  )
}

export default RichTextEditor