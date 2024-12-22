import * as AlertDialogPrimitive from '@rn-primitives/alert-dialog';
import * as React from 'react';
import { type ViewProps, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from '~/styles/stylesheet';
import { cfs, cs } from '~/styles/utils/combine';
import { withOpacity } from '~/styles/utils/with-opacity';
import { buttonStyleSheet } from './button';
import { TextStyleContext } from './text';

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  AlertDialogPrimitive.OverlayRef,
  AlertDialogPrimitive.OverlayProps
>(({ style, children, ...props }, ref) => {
  const { styles } = useStyles(stylesheet);
  return (
    <AlertDialogPrimitive.Overlay style={cs(styles.overlay, style)} {...props} ref={ref} asChild>
      <Animated.View entering={FadeIn.duration(150)} exiting={FadeOut.duration(150)}>
        {children}
      </Animated.View>
    </AlertDialogPrimitive.Overlay>
  );
});

AlertDialogOverlay.displayName = 'AlertDialogOverlay';

const AlertDialogContent = React.forwardRef<
  AlertDialogPrimitive.ContentRef,
  AlertDialogPrimitive.ContentProps & { portalHost?: string }
>(({ style, portalHost, ...props }, ref) => {
  const { styles } = useStyles(stylesheet);
  return (
    <AlertDialogPortal hostName={portalHost}>
      <AlertDialogOverlay>
        <AlertDialogPrimitive.Content ref={ref} style={cs(styles.content, style)} {...props} />
      </AlertDialogOverlay>
    </AlertDialogPortal>
  );
});
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({ style, ...props }: ViewProps) => {
  const { styles } = useStyles(stylesheet);
  return <View style={cs(styles.header, style)} {...props} />;
};
AlertDialogHeader.displayName = 'AlertDialogHeader';

const AlertDialogFooter = ({ style, ...props }: ViewProps) => {
  const { styles } = useStyles(stylesheet);
  return <View style={cs(styles.footer, style)} {...props} />;
};
AlertDialogFooter.displayName = 'AlertDialogFooter';

const AlertDialogTitle = React.forwardRef<
  AlertDialogPrimitive.TitleRef,
  AlertDialogPrimitive.TitleProps
>(({ style, ...props }, ref) => {
  const { styles } = useStyles(stylesheet);
  return <AlertDialogPrimitive.Title ref={ref} style={cs(styles.title, style)} {...props} />;
});
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  AlertDialogPrimitive.DescriptionRef,
  AlertDialogPrimitive.DescriptionProps
>(({ style, ...props }, ref) => {
  const { styles } = useStyles(stylesheet);
  return (
    <AlertDialogPrimitive.Description ref={ref} style={cs(styles.description, style)} {...props} />
  );
});
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  AlertDialogPrimitive.ActionRef,
  AlertDialogPrimitive.ActionProps
>(({ style, ...props }, ref) => {
  const { styles } = useStyles(buttonStyleSheet);
  return (
    <TextStyleContext.Provider value={styles.text()}>
      <AlertDialogPrimitive.Action ref={ref} style={cfs(styles.button(), style)} {...props} />
    </TextStyleContext.Provider>
  );
});
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  AlertDialogPrimitive.CancelRef,
  AlertDialogPrimitive.CancelProps
>(({ style, ...props }, ref) => {
  const { styles } = useStyles(buttonStyleSheet);
  return (
    <TextStyleContext.Provider value={styles.text({ variant: 'outline' })}>
      <AlertDialogPrimitive.Cancel
        ref={ref}
        style={cfs(styles.button({ variant: 'outline' }), style)}
        {...props}
      />
    </TextStyleContext.Provider>
  );
});
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};

const stylesheet = createStyleSheet(({ colors, utils }) => {
  return {
    overlay: {
      backgroundColor: withOpacity('black', 0.8),
      justifyContent: 'center',
      alignItems: 'center',
      padding: utils.space(2),
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    content: {
      maxWidth: utils.rem(32),
      gap: utils.space(4),
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
      padding: utils.space(6),
      ...utils.shadow('lg'),
      shadowColor: withOpacity(colors.foreground, 0.1),
      borderRadius: utils.rounded('lg'),
    },
    header: {
      gap: utils.space(2),
    },
    footer: {
      flexDirection: utils.mediaMinWidth('md') ? 'row-reverse' : 'column',
      gap: utils.space(2),
    },
    title: {
      fontSize: utils.fontSize('xl'),
      color: colors.foreground,
      fontWeight: utils.fontWeight('semibold'),
    },
    description: {
      fontSize: utils.fontSize('base'),
      color: colors.mutedForeground,
    },
  };
});