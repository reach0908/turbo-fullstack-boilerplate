'use client';

import { MoonIcon } from '@workspace/ui/components/moon';
import { SunIcon } from '@workspace/ui/components/sun';
import { useTheme } from 'next-themes';

import { Button } from '@workspace/ui/components/button';

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<Button
			variant="outline"
			size="icon"
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
		>
			{theme === 'light' ? <SunIcon /> : <MoonIcon />}
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
