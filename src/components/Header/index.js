import { useRef } from 'react'
import {
  Box,
  useColorModeValue,
  Container,
  HStack,
  useUpdateEffect,
  useDisclosure,
  chakra,
  useBreakpointValue,
  Text,
  Tag,
} from '@chakra-ui/react'
import { useI18n } from 'next-localization'
import NextLink from 'next/link'

import { NETWORK_LABELS } from '@/constants/constants'
import {
  DarkModeSwitch,
  LocaleSwitch,
  WalletConnect,
  MobileNavButton,
  MobileNavContent,
  NavLink,
  Logo,
} from '@/components/all'
import { useRLogin } from '@/hooks/useRLogin'

const MainNavLinkGroup = props => {
  const { t } = useI18n()
  const { isAdmin, isLoggedIn } = useRLogin()

  return (
    <HStack spacing='4' {...props}>
      <NavLink href='/courses'>{t('courses')}</NavLink>
      <NavLink href='/events'>{t('events')}</NavLink>
      {isLoggedIn && !isAdmin && (
        <>
          <NavLink href='/portfolio'>{t('portfolio')}</NavLink>
          <NavLink href='/profile'>{t('profile')}</NavLink>
        </>
      )}
      {isAdmin && <NavLink href='/admin'>{t('admin')}</NavLink>}
    </HStack>
  )
}

export const Header = props => {
  const mobileNavBtnRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = useColorModeValue('primary.50', 'dark.500')
  const colorScheme = useColorModeValue('primary', 'light')
  const { t } = useI18n()

  const { isLoggedIn, chainId } = useRLogin()

  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus()
  }, [isOpen])

  return (
    <>
      <Box d={useBreakpointValue({ base: 'none', md: 'block' })} bg={bg}>
        <Container maxW={1200}>
          <HStack w='full' py={1} justify='center' pos='relative'>
            <Box>
              <Text
                userSelect='none'
                color={useColorModeValue('primary.500', 'light.500')}
                fontSize='sm'
                fontWeight='bold'
              >
                <span aria-label='student' role='img'>
                  👨🏻‍🎓
                </span>{' '}
                {t('topBanner')}
              </Text>
            </Box>
            <HStack pos='absolute' right={0}>
              {isLoggedIn && NETWORK_LABELS[chainId] && (
                <Tag colorScheme={colorScheme}>{NETWORK_LABELS[chainId]}</Tag>
              )}
              <LocaleSwitch />
              <DarkModeSwitch />
            </HStack>
          </HStack>
        </Container>
      </Box>
      <Box
        pos='sticky'
        top='0'
        left='0'
        right='0'
        maxW='full'
        bg={useColorModeValue('white', 'dark.600')}
        boxShadow='md'
        zIndex='sticky'
        {...props}
      >
        <Container maxW={1200} h='4.5rem'>
          <HStack justify='space-between' align='center' h='full' w='full'>
            <HStack spacing={16}>
              <NextLink href='/' passHref>
                <chakra.a
                  fontWeight='bold'
                  fontSize='5em'
                  lineHeight='1'
                  mr={4}
                  d='flex'
                  justifyContent='center'
                  alignItems='center'
                  color={useColorModeValue('black', 'dark.50')}
                >
                  <Logo h='full' />
                </chakra.a>
              </NextLink>
              {useBreakpointValue({ base: false, md: true }) && (
                <MainNavLinkGroup />
              )}
            </HStack>
            {useBreakpointValue({ base: false, md: true }) && <WalletConnect />}
            <MobileNavButton
              ref={mobileNavBtnRef}
              aria-label='Open Menu'
              onClick={onOpen}
            />
          </HStack>
        </Container>
      </Box>
      <MobileNavContent isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default Header
