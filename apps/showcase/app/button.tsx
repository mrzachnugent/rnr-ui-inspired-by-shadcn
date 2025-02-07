import { Apple, Bot } from 'lucide-react-native';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Icon } from '~/lib/icon';

export default function ButtonScreen() {
  return (
    <View className='flex-1 justify-center items-center gap-5'>
      <Button>
        <Text>Default</Text>
      </Button>
      <Button variant='destructive'>
        <Text>Destructive</Text>
      </Button>
      <Button variant='destructive' disabled>
        <Text>Destructive disabled</Text>
      </Button>
      <Button variant='secondary'>
        <Text>Secondary</Text>
      </Button>
      <Button variant='outline' size='lg'>
        <Text>Outline lg</Text>
      </Button>
      <Button variant='outline' size='sm'>
        <Text>Outline sm</Text>
      </Button>
      <Button variant='ghost'>
        <Text>Ghost</Text>
      </Button>
      <Button variant='link' size='sm'>
        <Text>Link sm</Text>
      </Button>
      <Button className='flex-row bg-green-500'>
        <Icon as={Bot} className='text-primary-foreground mr-1' size={18} />
        <Text>Android</Text>
      </Button>
      <Button variant='secondary' className='flex-row'>
        <Icon as={Apple} className='text-secondary-foreground mr-1' size={18} />
        <Text>Apple</Text>
      </Button>
    </View>
  );
}
