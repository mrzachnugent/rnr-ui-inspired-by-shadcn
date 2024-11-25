import type { LucideIcon } from 'lucide-react-native';
import * as React from 'react';
import { Text, View, type ViewProps } from 'react-native';
import { createStyleSheet, useStyles } from '~/styles/stylesheet';
import { cs } from '~/styles/utils/combine';
import { withOpacity } from '~/styles/utils/with-opacity';

const Alert = React.forwardRef<
  React.ElementRef<typeof View>,
  ViewProps & {
    icon: LucideIcon;
    iconSize?: number;
    iconColor?: string;
    variant?: 'default' | 'destructive';
  }
>(
  (
    { style, variant = 'default', children, icon: Icon, iconSize = 16, iconColor, ...props },
    ref
  ) => {
    const { styles, theme } = useStyles(stylesheet);
    return (
      <View
        ref={ref}
        role='alert'
        style={cs(styles.root, variant === 'destructive' && styles.borderDestructive, style)}
        {...props}
      >
        <View style={styles.iconContainer}>
          <Icon
            size={iconSize}
            color={
              iconColor ?? variant === 'destructive'
                ? theme.colors.destructive
                : theme.colors.foreground
            }
          />
        </View>
        {children}
      </View>
    );
  }
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ style, ...props }, ref) => {
  const { styles } = useStyles(stylesheet);
  return <Text ref={ref} style={cs(styles.title, style)} {...props} />;
});
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ style, ...props }, ref) => {
  const { styles } = useStyles(stylesheet);
  return <Text ref={ref} style={cs(styles.description, style)} {...props} />;
});
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertDescription, AlertTitle };

const stylesheet = createStyleSheet(({ colors, utils }) => {
  return {
    root: {
      backgroundColor: colors.background,
      borderRadius: utils.rounded('lg'),
      borderWidth: 1,
      borderColor: colors.border,
      padding: utils.space(4),
      ...utils.shadow('lg'),
      shadowColor: withOpacity(colors.foreground, 0.1),
    },
    borderDestructive: {
      borderColor: colors.destructive,
    },
    iconContainer: {
      position: 'absolute',
      left: utils.space(3.5),
      top: utils.space(4),
      transform: [{ translateY: -utils.space(0.5) }],
    },
    title: {
      paddingLeft: utils.space(7),
      marginBottom: utils.space(1),
      fontWeight: utils.fontWeight('medium'),
      fontSize: utils.fontSize('base'),
      letterSpacing: utils.tracking('tight'),
      color: colors.foreground,
    },
    description: {
      paddingLeft: utils.space(7),
      fontSize: utils.fontSize('sm'),
      color: colors.foreground,
    },
  };
});