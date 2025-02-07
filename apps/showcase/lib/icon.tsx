import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cssInterop } from 'nativewind';
import { createIcon, PrimitiveIcon, IPrimitiveIcon, Svg } from '~/lib/rnr-icon';

export const UIIcon = createIcon({
  Root: PrimitiveIcon,
}) as React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof PrimitiveIcon> &
    React.RefAttributes<React.ElementRef<typeof Svg>>
>;

const iconStyle = cva('text-typography-950 fill-none pointer-events-none', {
  variants: {
    size: {
      '2xs': 'h-3 w-3',
      xs: 'h-3.5 w-3.5',
      sm: 'h-4 w-4',
      md: 'h-[18px] w-[18px]',
      lg: 'h-5 w-5',
      xl: 'h-6 w-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

cssInterop(UIIcon, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      height: true,
      width: true,
      fill: true,
      color: 'classNameColor',
      stroke: true,
    },
  },
});

type IIConProps = IPrimitiveIcon &
  (VariantProps<typeof iconStyle> | { size: number }) &
  React.ComponentPropsWithoutRef<typeof UIIcon>;

export const Icon = React.forwardRef<React.ElementRef<typeof Svg>, IIConProps>(
  ({ size = 'md', className, ...props }, ref) => {
    if (typeof size === 'number') {
      return <UIIcon ref={ref} {...props} className={iconStyle({ className })} size={size} />;
    } else if ((props.height !== undefined || props.width !== undefined) && size === undefined) {
      return <UIIcon ref={ref} {...props} className={iconStyle({ className })} />;
    }
    return <UIIcon ref={ref} {...props} className={iconStyle({ size, className })} />;
  }
);

type ParameterTypes = Omit<Parameters<typeof createIcon>[0], 'Root'>;

const createIconUI = ({ ...props }: ParameterTypes) => {
  const UIIconCreateIcon = createIcon({
    Root: Svg,
    ...props,
  }) as React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<typeof PrimitiveIcon> &
      React.RefAttributes<React.ElementRef<typeof Svg>>
  >;

  return React.forwardRef<React.ElementRef<typeof Svg>>(
    (
      {
        className,
        size,
        ...inComingProps
      }: VariantProps<typeof iconStyle> & React.ComponentPropsWithoutRef<typeof UIIconCreateIcon>,
      ref
    ) => {
      return (
        <UIIconCreateIcon
          ref={ref}
          {...inComingProps}
          className={iconStyle({ size, class: className })}
        />
      );
    }
  );
};
export { createIconUI as createIcon };
