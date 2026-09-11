import React from 'react';

interface SectionHeaderProps {
  kicker: string;
  title: React.ReactNode;
  subtitle?: string;
  action?: React.ReactNode;
  align?: 'left' | 'center';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  kicker,
  title,
  subtitle,
  action,
  align = 'left',
}) => {
  return (
    <div className={`section-header-wrap ${align === 'center' ? 'is-centered' : ''}`}>
      <div className="section-heading-main">
        <div className="section-kicker">{kicker}</div>
        <h2>{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
      {action && <div className="section-action">{action}</div>}
    </div>
  );
};
