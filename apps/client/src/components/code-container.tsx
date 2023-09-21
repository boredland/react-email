import { LayoutGroup, motion } from 'framer-motion';
import * as React from 'react';
import { copyTextToClipboard } from '../utils/copy-text-to-clipboard';
import { Code } from './code';
import { IconButton } from './icon-button';
import { IconCheck } from './icon-check';
import { IconClipboard } from './icon-clipboard';
import { IconDownload } from './icon-download';
import { Tooltip } from './tooltip';

interface CodeContainerProps {
  markups: MarkupProps[];
  activeLang: string;
  setActiveLang: (lang: string) => void;
}

interface MarkupProps {
  language: 'jsx' | 'markup' | 'markdown';
  content: string;
}

const languageMap = {
  jsx: 'React',
  markup: 'HTML',
  markdown: 'Plain Text',
};

export function CodeContainer({
  markups,
  activeLang,
  setActiveLang,
}: CodeContainerProps) {
  const [isCopied, setIsCopied] = React.useState(false);

  const renderDownloadIcon = () => {
    const value = markups.filter((markup) => markup.language === activeLang);
    const file = new File([value[0].content], `email.${value[0].language}`);
    const url = URL.createObjectURL(file);

    return (
      <a
        className="text-slate-11 transition ease-in-out duration-200 hover:text-slate-12"
        download={file.name}
        href={url}
      >
        <IconDownload />
      </a>
    );
  };

  const renderClipboardIcon = () => {
    const handleClipboard = () => {
      const activeContent = markups.filter(({ language }) => {
        return activeLang === language;
      });
      setIsCopied(true);
      void copyTextToClipboard(activeContent[0].content).then(() => {
        setTimeout(() => {
          setIsCopied(false);
        }, 3000);
      });
    };

    return (
      <IconButton onClick={handleClipboard}>
        {isCopied ? <IconCheck /> : <IconClipboard />}
      </IconButton>
    );
  };

  React.useEffect(() => {
    setIsCopied(false);
  }, [activeLang]);

  return (
    <pre
      className="border-slate-6 relative w-full items-center whitespace-pre rounded-md border text-sm backdrop-blur-md"
      style={{
        lineHeight: '130%',
        background:
          'linear-gradient(145.37deg, rgba(255, 255, 255, 0.09) -8.75%, rgba(255, 255, 255, 0.027) 83.95%)',
        boxShadow: 'rgb(0 0 0 / 10%) 0px 5px 30px -5px',
      }}
    >
      <div className="h-9 border-b border-slate-6">
        <div className="flex">
          <LayoutGroup id="code">
            {markups.map(({ language }) => {
              const isCurrentLang = activeLang === language;
              return (
                <motion.button
                  className={`relative py-[8px] px-4 text-sm font-medium font-sans transition ease-in-out duration-200 hover:text-slate-12 ${
                    activeLang !== language ? 'text-slate-11' : 'text-slate-12'
                  }`}
                  key={language}
                  onClick={() => {
                    setActiveLang(language);
                  }}
                >
                  {isCurrentLang ? (
                    <motion.span
                      animate={{ opacity: 1 }}
                      className="absolute left-0 right-0 top-0 bottom-0 bg-slate-4"
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0 }}
                      layoutId="code"
                    />
                  ) : null}
                  {languageMap[language]}
                </motion.button>
              );
            })}
          </LayoutGroup>
        </div>
        <Tooltip>
          <Tooltip.Trigger
            asChild
            className="absolute top-2 right-2 hidden md:block"
          >
            {renderClipboardIcon()}
          </Tooltip.Trigger>
          <Tooltip.Content>Copy to Clipboard</Tooltip.Content>
        </Tooltip>
        <Tooltip>
          <Tooltip.Trigger
            asChild
            className="text-gray-11 absolute top-2 right-8 hidden md:block"
          >
            {renderDownloadIcon()}
          </Tooltip.Trigger>
          <Tooltip.Content>Download</Tooltip.Content>
        </Tooltip>
      </div>
      {markups.map(({ language, content }) => {
        return (
          <div
            className={`${activeLang !== language && 'hidden'}`}
            key={language}
          >
            <Code language={language}>{content}</Code>
          </div>
        );
      })}
    </pre>
  );
}
