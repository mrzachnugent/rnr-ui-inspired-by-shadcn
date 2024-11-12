import * as AvatarPrimitive from '@rn-primitives/avatar';
import * as React from 'react';
import { ImageStyle } from 'react-native';
import { cs } from '~/lib/styles/utils/combine';
import { createStyleSheet, useStyleSheet } from '~/lib/styles/stylesheet';

const AvatarPrimitiveRoot = AvatarPrimitive.Root;
const AvatarPrimitiveImage = AvatarPrimitive.Image;
const AvatarPrimitiveFallback = AvatarPrimitive.Fallback;

const Avatar = React.forwardRef<AvatarPrimitive.RootRef, AvatarPrimitive.RootProps>(
  ({ style, ...props }, ref) => {
    const { styles } = useStyleSheet(stylesheet);
    return <AvatarPrimitiveRoot ref={ref} style={cs(styles.root, style)} {...props} />;
  }
);
Avatar.displayName = AvatarPrimitiveRoot.displayName;

const AvatarImage = React.forwardRef<AvatarPrimitive.ImageRef, AvatarPrimitive.ImageProps>(
  ({ style, ...props }, ref) => {
    const { styles } = useStyleSheet(stylesheet);
    return (
      <AvatarPrimitiveImage ref={ref} style={cs(styles.image, style) as ImageStyle} {...props} />
    );
  }
);
AvatarImage.displayName = AvatarPrimitiveImage.displayName;

const AvatarFallback = React.forwardRef<AvatarPrimitive.FallbackRef, AvatarPrimitive.FallbackProps>(
  ({ style, ...props }, ref) => {
    const { styles } = useStyleSheet(stylesheet);

    return <AvatarPrimitiveFallback ref={ref} style={cs(styles.fallback, style)} {...props} />;
  }
);
AvatarFallback.displayName = AvatarPrimitiveFallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };

const stylesheet = createStyleSheet(({ colors }, { space, rounded }) => {
  return {
    root: {
      position: 'relative',
      height: space[10],
      width: space[10],
      borderRadius: rounded['full'],
      overflow: 'hidden',
      flexShrink: 0,
    },
    image: {
      aspectRatio: 1,
      height: '100%',
      width: '100%',
    },
    fallback: {
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      borderRadius: rounded['full'],
      backgroundColor: colors.muted,
    },
  };
});