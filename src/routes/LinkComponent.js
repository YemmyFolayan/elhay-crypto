import React from 'react';
import { Link } from '@reach/router';

/**
 * @todo
 * - Handle permission here
 * - Check current user
 */

const LinkComponent = props => {
  const { to, className, children, style } = props;
  return (
    <Link to={to} className={className} {...props} style={style}>
      {children}
    </Link>
  );
};

export default LinkComponent;
