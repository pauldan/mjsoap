const theme = {
  font: {
    primary: 'Merriweather, "Times New Roman", Times, serif',
    secondary: 'Montserrat, Helvetica, Verdana, Arial, sans-serif',
  },
  color: {
    primary: '#612D86',
    primaryLight: '#B987B9',
    secondary: '#555',
    secondaryLight: '#50505033',
    danger: '#dc1717',
    dangerLight: '#ff505050',
    // warning: '#ff9900 ',
    warning: 'hsl(36,85%,44%)',
    warningLight: '#ff990050',
    success: '#33cc33',
    successLight: '#33cc3350',
    info: '#33ccff',
    infoLight: '#33ccff50',
    default: '#222222',
    defaultLight: '#22222250',
  },
  shadow: '0 0 2px 0 rgba(0, 0, 0, 0.5)',
  shadow2: '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)', //'1px 1px 1px 0 rgba(0, 0, 0, 0.1)',
  shadow2focus:
    '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08), 0 0 3px 3px hsla(275, 54%, 60%, 0.3)',
  shadow2top: '0 -4px 6px rgba(50,50,93,.11), 0 -1px 3px rgba(0,0,0,.08)', //'1px 1px 1px 0 rgba(0, 0, 0, 0.1)',
  shadow3: '0 8px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)', //'1px 1px 1px 0 rgba(0, 0, 0, 0.1)',
  shadow4:
    '0 30px 60px -12px rgba(50,50,93,.25), 0 18px 36px -18px rgba(0,0,0,.3), 0 -12px 36px -8px rgba(0,0,0,.025)',
  border: {
    radius: '3px',
  },
};

theme.gradients = {
  primary: `linear-gradient(45deg, ${theme.color.primary},
    ${theme.primaryLight})`,
  light: `linear-gradient(15deg, white, 10%,
    ${theme.color.primaryLight}, 10%, white)`,
};

export default theme;
