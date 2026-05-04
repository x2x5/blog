import React from 'react';
import Giscus from '@giscus/react';
import {useColorMode} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Comments(): JSX.Element {
  const {colorMode} = useColorMode();
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext();

  return (
    <div className="giscus-container">
      <Giscus
        repo="x2x5/blog"
        repoId="R_kgDOSTQvog"
        category="Comments"
        categoryId="DIC_kwDOSTQvos4C8Qjh"
        mapping="pathname"
        strict="0"
        reactionsEnabled="0"
        emitMetadata="0"
        inputPosition="bottom"
        theme={colorMode === 'dark' ? 'dark' : 'light'}
        lang={currentLocale === 'zh-CN' ? 'zh-CN' : 'en'}
        loading="lazy"
      />
    </div>
  );
}
