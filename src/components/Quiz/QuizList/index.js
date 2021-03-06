import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  Box,
  Button,
  Th,
  Tr,
  Table,
  Td,
  Heading,
  Center,
  useColorModeValue,
} from '@chakra-ui/react'

import { useQuiz } from '@/hooks/useQuiz'
import { useSubmitAnswers } from '@/hooks/transactions/useSubmitAnswers'
import { useRLogin } from '@/hooks/useRLogin'
import { Locked } from '@/components/all'
import { QuizItem } from '../QuizItem'

export const QuizList = ({ course, module, numberOfQuestions }) => {
  const { questions, start, userAnswers = {} } = useQuiz(
    course,
    module,
    numberOfQuestions,
  )

  const QUIZ_NAME = `${course}-${module}`
  const numberOfAnswers = Object.keys(userAnswers)?.length || 0
  const color = useColorModeValue('primary.500', 'light.500')

  const { submitAnswers, isLoading } = useSubmitAnswers(
    course,
    module,
    numberOfQuestions,
  )

  const { quizResults } = useSelector(state => state.profile)
  const { isLoggedIn } = useRLogin()

  useEffect(() => {
    start()
  }, [])

  const handleSubmit = async () => {
    await submitAnswers()
  }

  if (!isLoggedIn) {
    return (
      <Center h='full'>
        <Locked />
      </Center>
    )
  }

  return (
    <Box>
      {quizResults && quizResults[QUIZ_NAME] && (
        <Box
          mx='auto'
          mb={8}
          p={8}
          boxShadow='lg'
          maxW='500px'
          borderWidth={1}
          borderColor={color}
        >
          <Heading textAlign='center' as='h4' size='md'>
            Quiz Results
          </Heading>
          <Table>
            <Tr>
              <Th>Attempt</Th>
              <Td>{quizResults[QUIZ_NAME].attempt}</Td>
            </Tr>
            <Tr>
              <Th>Grade</Th>
              <Td>
                {quizResults[QUIZ_NAME].grade} / {quizResults[QUIZ_NAME].total}
              </Td>
            </Tr>
          </Table>
        </Box>
      )}
      {questions?.map((question, index) => (
        <QuizItem
          userAnswers={userAnswers}
          key={index}
          course={course}
          module={module}
          question={question}
          order={index + 1}
        />
      ))}
      <Button
        variant='normal'
        leftIcon={`${numberOfAnswers}/${numberOfQuestions}`}
        isDisabled={numberOfAnswers !== numberOfQuestions}
        onClick={handleSubmit}
        isLoading={isLoading}
      >
        Submit
      </Button>
    </Box>
  )
}

QuizList.propTypes = {
  course: PropTypes.string.isRequired,
  module: PropTypes.string.isRequired,
  numberOfQuestions: PropTypes.number,
}

export default QuizList
