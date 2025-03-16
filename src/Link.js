/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useRouter } from "next/router";
import NextLink from "next/link";
import MuiLink from "@mui/material/Link";

const NextComposed = React.forwardRef(function NextComposed(
  { as, href, ...other },
  ref
) {
  return (
    <NextLink href={href} as={as} passHref>
      <a ref={ref} {...other} />
    </NextLink>
  );
});

NextComposed.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

// MUI bilan ishlovchi Next.js Link
const Link = React.forwardRef(function Link(
  { href, activeClassName = "active", className, naked, ...other },
  ref
) {
  const router = useRouter();
  const pathname = typeof href === "string" ? href : href?.pathname;
  const classNameFinal = clsx(className, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  if (naked) {
    return (
      <NextComposed
        className={classNameFinal}
        ref={ref}
        href={href}
        {...other}
      />
    );
  }

  return (
    <MuiLink
      component={NextComposed}
      className={classNameFinal}
      ref={ref}
      href={href}
      {...other}
    />
  );
});

Link.propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  naked: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Link;
