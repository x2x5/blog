import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import BlogPostItemContainer from '@theme/BlogPostItem/Container';
import BlogPostItemHeader from '@theme/BlogPostItem/Header';
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title';
import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info';
import BlogPostItemContent from '@theme/BlogPostItem/Content';
import BlogPostItemFooter from '@theme/BlogPostItem/Footer';
import TagsListInline from '@theme/TagsListInline';
import type {Props} from '@theme/BlogPostItem';

function useContainerClassName() {
  const {isBlogPostPage} = useBlogPost();
  return !isBlogPostPage ? 'margin-bottom--xl' : undefined;
}

export default function BlogPostItem({children, className}: Props): ReactNode {
  const {isBlogPostPage, metadata} = useBlogPost();
  const containerClassName = useContainerClassName();

  if (isBlogPostPage) {
    return (
      <BlogPostItemContainer className={clsx(containerClassName, className)}>
        <BlogPostItemHeaderTitle />
        {metadata.tags.length > 0 && (
          <div style={{marginBottom: '0.5rem'}}>
            <TagsListInline tags={metadata.tags} />
          </div>
        )}
        <BlogPostItemHeaderInfo />
        <BlogPostItemContent>{children}</BlogPostItemContent>
        <BlogPostItemFooter />
      </BlogPostItemContainer>
    );
  }

  return (
    <BlogPostItemContainer className={clsx(containerClassName, className)}>
      <BlogPostItemHeaderTitle />
      {metadata.tags.length > 0 && (
        <div style={{marginBottom: '0.5rem'}}>
          <TagsListInline tags={metadata.tags} />
        </div>
      )}
      <BlogPostItemHeaderInfo />
      <BlogPostItemContent>{children}</BlogPostItemContent>
    </BlogPostItemContainer>
  );
}
