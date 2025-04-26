import React from "react";

export interface ExternalLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export const ExternalLink = (props: ExternalLinkProps) => {
  const { href, children, ...anchorProps } = props;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...anchorProps}>
      {children}
    </a>
  );
};
