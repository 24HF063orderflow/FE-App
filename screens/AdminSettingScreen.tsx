import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Alert, ScrollView } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';

// Props 타입 정의
type screenType = 'MainScreen' | 'AnotherScreen';

type Props = {
  screenChange: (screen: screenType) => void;
};

const AdminSettingsScreen = ({ screenChange }: Props) => {
  const handlePress = (screenName: screenType) => {
    screenChange(screenName);
  };

  // 상태 변수 정의
  const [setting1, setSetting1] = useState<boolean>(true);
  const [setting2, setSetting2] = useState<boolean>(false);
  const [apiUrl, setApiUrl] = useState<string>('https://api.example.com');
  const [storeName, setStoreName] = useState<string>('가맹점 이름');
  const [storeAddress, setStoreAddress] = useState<string>('가맹점 주소');
  const [storePhone, setStorePhone] = useState<string>('010-1234-5678');

  const handleSave = () => {
    Alert.alert('설정 저장', '설정이 저장되었습니다!');
  };

  const handleCancel = () => {
    Alert.alert('설정 취소', '변경 사항이 취소되었습니다.');
    screenChange('MainScreen');
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="가맹점 정보 수정" />
        <Card.Content>
          <TextInput label="가맹점 이름" value={storeName} onChangeText={setStoreName} style={styles.input} />
          <TextInput label="가맹점 주소" value={storeAddress} onChangeText={setStoreAddress} style={styles.input} />
          <TextInput label="전화번호" value={storePhone} onChangeText={setStorePhone} style={styles.input} keyboardType="phone-pad" />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="기본 설정" />
        <Card.Content>
          <View style={styles.option}>
            <Text>설정 1</Text>
            <Switch value={setting1} onValueChange={setSetting1} />
          </View>
          <View style={styles.option}>
            <Text>설정 2</Text>
            <Switch value={setting2} onValueChange={setSetting2} />
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="API 설정" />
        <Card.Content>
          <TextInput label="API URL" value={apiUrl} onChangeText={setApiUrl} style={styles.input} />
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleSave} style={styles.button}>
          설정 저장
        </Button>
        <Button mode="outlined" onPress={handleCancel} style={styles.button}>
          취소
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginBottom: 16,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  input: {
    marginTop: 8,
  },
  buttonContainer: {
    marginTop: 16,
  },
  button: {
    marginVertical: 8,
  },
});

export default AdminSettingsScreen;