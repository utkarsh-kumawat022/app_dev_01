import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handlePress = value => {
    // Avoid two operators in a row
    if (/[-+*/]/.test(value) && /[-+*/]$/.test(input)) return;
    setInput(input + value);
  };

  const clearAll = () => {
    setInput('');
    setResult('');
  };

  const calculate = () => {
    if (!input) return;
    try {
      // Evaluate expression safely
      const evaluated = eval(input);
      setResult(String(evaluated));
    } catch (err) {
      setResult('Error');
    }
  };

  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        
        <View style={styles.display}>
          <Text style={styles.inputText}>{input || '0'}</Text>
          {result !== '' && <Text style={styles.resultText}>= {result}</Text>}
        </View>

        <TouchableOpacity style={styles.clearBtn} onPress={clearAll}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>

        <View style={styles.keypad}>
          {buttons.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map(key => (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.key,
                    key === '=' ? styles.equalBtn : null,
                    /[-+*/]/.test(key) ? styles.operatorBtn : null,
                  ]}
                  onPress={() => (key === '=' ? calculate() : handlePress(key))}
                >
                  <Text style={styles.keyText}>{key}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#111' },
  container: { flex: 1, padding: 20 },

  display: {
    padding: 20,
    backgroundColor: '#222',
    borderRadius: 10,
    marginBottom: 15,
  },
  inputText: {
    fontSize: 38,
    color: 'white',
    textAlign: 'right',
  },
  resultText: {
    fontSize: 25,
    color: '#00e676',
    textAlign: 'right',
    marginTop: 10,
  },

  clearBtn: {
    backgroundColor: '#e53935',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  clearText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },

  keypad: { flex: 1, justifyContent: 'space-between' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },

  key: {
    backgroundColor: '#333',
    width: '22%',
    paddingVertical: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyText: { fontSize: 26, fontWeight: '600', color: 'white' },

  operatorBtn: {
    backgroundColor: '#0288d1',
  },
  equalBtn: {
    backgroundColor: '#43a047',
  },
});
