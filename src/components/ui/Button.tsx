import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type BaseProps = {
  variant?: "primary" | "outline";
  children: React.ReactNode;
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button({
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-block px-8 py-3 text-sm uppercase tracking-[0.15em] font-medium transition-all duration-500 ease-out cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-mustard text-brown hover:bg-mustard/80",
    outline: "border border-brown text-brown hover:bg-brown hover:text-white",
  };

  const className = `${base} ${variants[variant]}`;

  if ("href" in props && props.href) {
    return (
      <a className={className} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={className} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
