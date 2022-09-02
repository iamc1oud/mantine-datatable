import {
  ActionIcon,
  Box,
  Button,
  Center,
  createStyles,
  Group,
  SegmentedControl,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { Menu2, Moon, Sun } from 'tabler-icons-react';
import { HEADER_HEIGHT, NAVBAR_BREAKPOINT, NAVBAR_WIDTH, REPO_LINK } from '~/config';
import GitHubIcon from './GitHubIcon';
import Logo from './Logo';

const useStyles = createStyles((theme) => {
  const breakpointMediaQuery = `@media (min-width: ${theme.breakpoints[NAVBAR_BREAKPOINT]}px)`;
  const buttonBorder = `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`;
  const actionIconColor = theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6];

  return {
    root: {
      position: 'fixed',
      zIndex: 10,
      top: 0,
      left: 0,
      right: 0,
      height: HEADER_HEIGHT,
      background: theme.fn.rgba(theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white, 0.75),
      backdropFilter: 'blur(2px)',
      borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
      justifyContent: 'space-between',
      [breakpointMediaQuery]: {
        marginLeft: NAVBAR_WIDTH,
      },
    },
    menuIcon: {
      color: actionIconColor,
      [breakpointMediaQuery]: {
        display: 'none',
      },
    },
    logo: {
      opacity: 1,
      transition: 'opacity .15s ease',
      [breakpointMediaQuery]: {
        display: 'none',
      },
    },
    logoWithNavbarVisible: {
      opacity: 0,
    },
    actionIcons: {
      [breakpointMediaQuery]: {
        display: 'none',
      },
    },
    actionIcon: {
      border: `1px solid ${actionIconColor}`,
      color: actionIconColor,
    },
    sourceCodeButton: {
      border: buttonBorder,
      display: 'none',
      [breakpointMediaQuery]: {
        display: 'inherit',
      },
    },
    sourceCodeButtonIcon: {
      marginBottom: -2,
      '&&': { marginRight: 5 },
    },
    colorSchemeSegmentedControlContainer: {
      display: 'none',
      [breakpointMediaQuery]: {
        display: 'inherit',
      },
    },
    colorSchemeSegmentedControl: {
      border: buttonBorder,
    },
  };
});

export default function AppHeader({
  navbarVisible,
  onShowNavbarClick,
}: {
  navbarVisible: boolean;
  onShowNavbarClick: () => void;
}) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const ColorSchemeIcon = colorScheme === 'dark' ? Sun : Moon;

  const { classes, cx } = useStyles();

  return (
    <Group className={classes.root} px="sm" spacing="xs">
      <Menu2 className={classes.menuIcon} strokeWidth={1} onClick={onShowNavbarClick} />
      <Button
        classNames={{ root: classes.sourceCodeButton, icon: classes.sourceCodeButtonIcon }}
        size="xs"
        variant="default"
        leftIcon={<GitHubIcon size={16} />}
        component="a"
        href={REPO_LINK}
        target="_blank"
      >
        Source code
      </Button>
      <Logo className={cx(classes.logo, { [classes.logoWithNavbarVisible]: navbarVisible })} insideHeader />
      <Group className={classes.actionIcons} spacing="xs">
        <ActionIcon className={classes.actionIcon} variant="outline" component="a" href={REPO_LINK} target="_blank">
          <GitHubIcon size={16} />
        </ActionIcon>
        <ActionIcon className={classes.actionIcon} variant="outline" onClick={() => toggleColorScheme()}>
          <ColorSchemeIcon size={16} />
        </ActionIcon>
      </Group>
      <Group className={classes.colorSchemeSegmentedControlContainer} spacing="xs">
        <Text size="xs" weight={500}>
          Switch theme
        </Text>
        <SegmentedControl
          size="xs"
          className={classes.colorSchemeSegmentedControl}
          value={colorScheme}
          onChange={() => toggleColorScheme()}
          data={[
            {
              value: 'light',
              label: (
                <Center>
                  <Sun size={14} />
                  <Box ml={10}>Light</Box>
                </Center>
              ),
            },
            {
              value: 'dark',
              label: (
                <Center>
                  <Moon size={14} />
                  <Box ml={10}>Dark</Box>
                </Center>
              ),
            },
          ]}
        />
      </Group>
    </Group>
  );
}
