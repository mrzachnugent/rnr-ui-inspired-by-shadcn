import React, { forwardRef } from 'react';
import type { ColorValue, ViewProps } from 'react-native';
import { Path, G } from 'react-native-svg';

interface CreateIconOptions {
  /**
   * The icon `svg` viewBox
   * @default "0 0 24 24"
   */
  viewBox?: string;
  /**
   * The `svg` path or group element
   * @type React.ReactElement | React.ReactElement[]
   */
  path?: React.ReactElement | React.ReactElement[];
  /**
   * If the `svg` has a single path, simply copy the path's `d` attribute
   */
  d?: string;
  /**
   * The display name useful in the dev tools
   */
  displayName?: string;
  /**
   * Default props automatically passed to the component; overwritable
   */
  defaultProps?: any;
  type?: any;
}

export interface IIconProps extends ViewProps {}

export type IIconComponentType<IconProps> = React.ForwardRefExoticComponent<
  IIconProps & IconProps & React.RefAttributes<IconProps>
>;

const ChildPath = ({ element, fill, stroke: pathStroke }: any) => {
  const pathStrokeColor = pathStroke || '';
  const fillColor = fill || '';

  if (!element) {
    return null;
  }

  return React.cloneElement(element, {
    fill: fillColor ? fillColor : 'currentColor',
    stroke: pathStrokeColor,
  });
};

export function createIcon<IconProps>({
  Root,
  path,
  d,
  ...initialProps
}: { Root: React.ComponentType<IconProps> } & CreateIconOptions) {
  const IconTemp = forwardRef((props: any, ref?: any) => {
    let children = path;
    if (d && (!path || Object.keys(path).length === 0)) {
      children = <Path fill="currentColor" d={d} />;
    }

    const finalProps = {
      ...initialProps,
      ...props,
    };

    const {
      stroke = 'currentColor',
      color,
      role = 'img',
      ...resolvedProps
    } = finalProps;
    let type = resolvedProps.type;
    if (type === undefined) {
      type = 'svg';
    }
    let colorProps = {};
    if (color) {
      colorProps = { ...colorProps, color: color };
    }
    if (stroke) {
      colorProps = { ...colorProps, stroke: stroke };
    }

    let sizeProps = {};
    let sizeStyle = {};
    if (type === 'font') {
      if (resolvedProps.sx) {
        sizeProps = { ...sizeProps, fontSize: resolvedProps?.sx?.h };
      }
      if (resolvedProps.size) {
        // sizeProps = { ...sizeProps, fontSize: resolvedProps?.size };
      }
    }

    return (
      <Root
        {...resolvedProps}
        {...colorProps}
        role={role}
        ref={ref}
        {...sizeProps}
        {...sizeStyle}
      >
        {React.Children.count(children) > 0 ? (
          <G>
            {React.Children.map(children, (child, i) => (
              <ChildPath
                key={child?.key ?? i}
                element={child}
                {...child?.props}
              />
            ))}
          </G>
        ) : null}
      </Root>
    );
  });

  const Icon = IconTemp as IIconComponentType<
    IconProps | { fill?: ColorValue; stroke?: ColorValue }
  >;
  return Icon;
}
