import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Container, Box, AppBar, Toolbar, Typography } from '@mui/material';
import HomePage from '@pages/HomePage';
export default function App() {
    return (_jsxs(_Fragment, { children: [_jsx(AppBar, { position: "static", children: _jsx(Toolbar, { children: _jsx(Typography, { variant: "h6", component: "div", sx: { flexGrow: 1 }, children: "Dragonvite" }) }) }), _jsx(Box, { component: "main", children: _jsx(Container, { maxWidth: "lg", children: _jsx(HomePage, {}) }) })] }));
}
