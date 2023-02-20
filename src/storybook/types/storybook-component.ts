import { Meta } from '@storybook/html'
import { ComponentProps, ValidComponent } from 'solid-js'

export type StorybookComponent<T extends ValidComponent> = Meta<ComponentProps<T>>
