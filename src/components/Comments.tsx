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
        repoId="REPLACE_WITH_GISCUS_REPO_ID"
        category="Comments"
        categoryId="REPLACE_WITH_GISCUS_CATEGORY_ID"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={colorMode === 'dark' ? 'dark' : 'light'}
        lang={currentLocale === 'zh-CN' ? 'zh-CN' : 'en'}
        loading="lazy"
      />
    </div>
  );
}
