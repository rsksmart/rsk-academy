/* eslint-disable react/display-name */
import { Alert, Box, chakra, Kbd, useColorModeValue } from '@chakra-ui/react'

import { CodeBlock, IconsList, PropsTable } from '@/components/index'

const Pre = props => <chakra.div my='2em' borderRadius='sm' {...props} />

const Table = props => (
  <chakra.div overflowX='auto'>
    <chakra.table textAlign='left' mt='32px' width='full' {...props} />
  </chakra.div>
)

const THead = props => (
  <chakra.th
    bg={useColorModeValue('gray.50', 'whiteAlpha.100')}
    fontWeight='semibold'
    p={2}
    fontSize='sm'
    {...props}
  />
)

const TData = props => (
  <chakra.td
    p={2}
    borderTopWidth='1px'
    borderColor='inherit'
    fontSize='sm'
    whiteSpace='normal'
    {...props}
  />
)

const LinkedHeading = props => {
  const color = useColorModeValue('primary.500', 'rsk.text.500')
  return (
    <chakra.h2 data-group='' css={{ scrollMarginBlock: '6.875rem' }} {...props}>
      <span>{props.children}</span>
      {props.id && (
        <chakra.a
          aria-label='anchor'
          color={color}
          fontWeight='normal'
          outline='none'
          _focus={{ opacity: 1, boxShadow: 'outline' }}
          opacity={0}
          _groupHover={{ opacity: 1 }}
          ml='0.375rem'
          href={`#${props.id}`}
        >
          #
        </chakra.a>
      )}
    </chakra.h2>
  )
}

const InlineCode = props => (
  <chakra.code
    apply='mdx.code'
    color={useColorModeValue('purple.500', 'purple.200')}
    {...props}
  />
)

export const MdxComponents = {
  h1: props => <chakra.h1 apply='mdx.h1' {...props} />,
  h2: props => <LinkedHeading apply='mdx.h2' {...props} />,
  h3: props => <LinkedHeading as='h3' apply='mdx.h3' {...props} />,
  h4: props => <LinkedHeading as='h4' apply='mdx.h4' {...props} />,
  hr: props => <chakra.hr apply='mdx.hr' {...props} />,
  strong: props => <Box as='strong' fontWeight='semibold' {...props} />,
  inlineCode: InlineCode,
  code: CodeBlock,
  pre: Pre,
  kbd: Kbd,
  br: props => <Box height='24px' {...props} />,
  table: Table,
  th: THead,
  td: TData,
  a: props => <chakra.a apply='mdx.a' {...props} />,
  p: props => <chakra.p apply='mdx.p' {...props} />,
  ul: props => <chakra.ul apply='mdx.ul' {...props} />,
  ol: props => <chakra.ol apply='mdx.ul' {...props} />,
  li: props => <chakra.li pb='4px' {...props} />,
  blockquote: props => (
    <Alert
      mt='4'
      role='none'
      status='warning'
      variant='left-accent'
      as='blockquote'
      rounded='4px'
      my='1.5rem'
      {...props}
    />
  ),
  IconsList,
  PropsTable,
}

export default MdxComponents