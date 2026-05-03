import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import {ThemeClassNames} from '@docusaurus/theme-common';
import EditMetaRow from '@theme/EditMetaRow';
import TagsListInline from '@theme/TagsListInline';

export default function BlogPostItemFooter(): ReactNode {
  const {metadata, isBlogPostPage} = useBlogPost();
  const {tags, editUrl, lastUpdatedBy, lastUpdatedAt} = metadata;

  // Tags are shown in the header area on list view
  if (!isBlogPostPage) {
    return null;
  }

  const tagsExists = tags.length > 0;
  const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);

  if (!tagsExists && !canDisplayEditMetaRow) {
    return null;
  }

  return (
    <footer className="docusaurus-mt-lg">
      {tagsExists && (
        <div
          className={clsx(
            'row',
            'margin-top--sm',
            ThemeClassNames.blog.blogFooterEditMetaRow,
          )}>
          <div className="col">
            <TagsListInline tags={tags} />
          </div>
        </div>
      )}
      {canDisplayEditMetaRow && (
        <EditMetaRow
          className={clsx(
            'margin-top--sm',
            ThemeClassNames.blog.blogFooterEditMetaRow,
          )}
          editUrl={editUrl}
          lastUpdatedAt={lastUpdatedAt}
          lastUpdatedBy={lastUpdatedBy}
        />
      )}
    </footer>
  );
}
