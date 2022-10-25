import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';
import mock from '../../model/mock';
import {Game} from '../../model/game';
console.log(mock);

const GameScreen = ({}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const gameRef = useRef(new Game(mock, a => a));
  const question = gameRef.current.getQuestion();
  const {width} = useWindowDimensions();
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const reset = () => {
    gameRef.current = new Game(mock, a => a);
  };
  const onAnswerPress = (answer: string) => {
    setSelectedAnswer(answer);
    console.log(answer);
  };

  const getColorForSelectedAnswer = answer => {
    if (!selectedAnswer) return 'pink';
    if (selectedAnswer === answer) {
      const isCorrect = gameRef.current.checkAnswer(answer);
      return isCorrect ? 'green' : 'red';
    }
    return 'pink';
  };

  return (
    <SafeAreaView testID="main-screen" style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <Text onPress={reset} testID="main-header" style={styles.header}>
        {question.content}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          flex: 0.4,
        }}>
        {question.answers.map((a, i) => (
          <Pressable
            onPress={() => onAnswerPress(a)}
            style={{
              margin: 10,
              width: width / 2.5,
              height: '70%',
              backgroundColor: getColorForSelectedAnswer(a),
              justifyContent: 'center',
              borderWidth: 1,
            }}>
            <Text adjustsFontSizeToFit style={styles.answer}>
              {a}
            </Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  header: {
    marginTop: 40,
    fontSize: 45,
    fontWeight: '900',
    textAlign: 'center',
    color: 'black',
  },
  answer: {
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export default GameScreen;
