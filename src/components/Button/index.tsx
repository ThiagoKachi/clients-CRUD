import React, { ReactElement } from 'react';
import { Button, IconButton, useBreakpointValue } from '@chakra-ui/react';

type ButtonActionProps = {
  title?: string;
  icon: ReactElement;
  type: 'button' | 'submit' | 'reset' | undefined;
  onclick?: () => void;
  color?: string;
};

export function ButtonAction({
  title,
  icon,
  type,
  onclick,
  color,
}: ButtonActionProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    sm: true,
  });

  return isWideVersion ? (
    <Button
      rightIcon={icon}
      colorScheme={color ? color : 'twitter'}
      color="white"
      type={type}
      onClick={onclick}
      w={['24', '28', '32']}
      ml="2"
    >
      {title}
    </Button>
  ) : (
    <Button
      colorScheme={color ? color : 'twitter'}
      color="white"
      type={type}
      onClick={onclick}
      w={['28', '32']}
      ml="2"
    >
      <IconButton
        aria-label="Search"
        icon={icon}
        bg="twitter"
        _hover={{ backgroundColor: 'twitter' }}
        _active={{ backgroundColor: 'twitter' }}
      />
    </Button>
  );
}
