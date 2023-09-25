import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {useGame} from './useGame';

const GameScreen = ({}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const {
    question,
    selectedAnswer,
    isCorrect,
    onSelectedAnswerChange,
    reset,
    isError,
  } = useGame();

  const onAnswerPress = (answer: string) => {
    onSelectedAnswerChange(answer);
  };

  const getColorForAnswer = (answer: string) => {
    if (selectedAnswer === null) return 'pink';

    if (selectedAnswer === answer) {
      return isCorrect ? 'green' : 'red';
    }

    return 'pink';
  };

  return (
    <SafeAreaView testID="main-screen" style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {isError === true ? (
        <Text testID="error-text">Error</Text>
      ) : (
        <View testID="game-section" style={{flex: 1}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.questionContainer}
            contentContainerStyle={{marginHorizontal: 5}}>
            <Pressable onPress={reset}>
              <Text testID="main-header" style={styles.header}>
                {question?.content}
              </Text>
            </Pressable>
          </ScrollView>
          <View style={styles.answerContainer}>
            {question?.answers.map(a => (
              <Pressable
                key={a}
                onPress={() => onAnswerPress(a)}
                style={[
                  styles.answerButton,
                  {backgroundColor: getColorForAnswer(a)},
                ]}>
                <Text adjustsFontSizeToFit style={styles.answer}>
                  {a}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  questionContainer: {
    flex: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 0.6,
  },
  header: {
    marginTop: '35%',
    marginBottom: '45%',
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
    color: 'black',
  },
  answerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flex: 0.7,
  },
  answerButton: {
    margin: 15,
    height: '40%',
    width: '40%',
    justifyContent: 'center',
    borderWidth: 1,
  },
  answer: {
    fontSize: 20,
    fontWeight: '600',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export default GameScreen;
