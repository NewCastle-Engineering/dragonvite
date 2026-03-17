import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, Button, Stack } from '@mui/material';
export default function HomePage() {
    return (_jsxs(Box, { sx: { py: 8 }, children: [_jsx(Typography, { variant: "h1", component: "h1", sx: { textAlign: 'center' }, children: "Welcome to Dragonvite" }), _jsx(Typography, { variant: "h6", component: "p", sx: { textAlign: 'center', color: 'text.secondary', mt: 2 }, children: "A production-ready monorepo scaffold with React, Fastify, and real-time capabilities" }), _jsxs(Stack, { direction: "row", spacing: 2, sx: { justifyContent: 'center', mt: 4 }, children: [_jsx(Button, { variant: "contained", children: "Get Started" }), _jsx(Button, { variant: "outlined", children: "Learn More" })] })] }));
}
