import { PageHeader } from "antd";
import React from "react";

// displays a page header

export default function Header({link, title, subTitle}) {

  const headerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  }

  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <PageHeader
        title={title}
        subTitle={subTitle}
        style={headerStyle}
      />
    </a>
  );
}


Header.defaultProps = {
  link: "https://fortunawealth.finance",
  title: "Fortuna Wealth Generator",
  subTitle: "Smart Contract that generates wealth every day",
}