import { Link } from "react-router-dom";
import clsx from "clsx";

export default function Card({
  title,
  subtitle,
  tags = [],
  actions,
  to,
  className = "",
  children,
}) {
  const CardWrapper = to ? Link : "div";
  const cardProps = to ? { to } : {};

  return (
    <CardWrapper
      {...cardProps}
      className={clsx(
        "glass rounded-xl p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-soft",
        to && "cursor-pointer",
        className
      )}
    >
      <div className="flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-lg font-semibold text-white truncate">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-1 text-sm text-gray-400 truncate">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-300 border border-primary-500/20"
              >
                {tag.icon && <span>{tag.icon}</span>}
                {tag.label}
              </span>
            ))}
          </div>
        )}

        {/* Children content */}
        {children && <div className="text-sm text-gray-300">{children}</div>}
      </div>
    </CardWrapper>
  );
}
