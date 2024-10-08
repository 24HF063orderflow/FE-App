import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions, StatusBar, ImageBackground, Image, Alert } from 'react-native';
import Draggable from 'react-native-draggable';

interface Table {
    id: number;
    name: string;
    token: string;
    x: number;
    y: number;
    checked?: boolean;
}

type screenType = 'ManagerMain';

type Props = {
    screenChange: (screen: screenType) => void;
};

const TableManager = ({ screenChange }: Props) => {
    const handlePress = (screenName: screenType) => {
        screenChange(screenName);
    };

    const [tables, setTables] = useState<Table[]>([]);
    const [tableCount, setTableCount] = useState<number>(0);
    const [isMoveMode, setIsMoveMode] = useState<boolean>(false);
    const [isQRCodeVisible, setIsQRCodeVisible] = useState<boolean>(false);
    const [qrCodeURL, setQRCodeURL] = useState<string>('');
    const [isQRCodeLoaded, setIsQRCodeLoaded] = useState<boolean>(false);
    const tableAreaWidth = Dimensions.get('window').width - 40;
    const tableAreaHeight = Dimensions.get('window').height - 240;

    // 고유 토큰 생성 함수
    const generateToken = (): string => {
        return Math.random().toString(36).substr(2, 9);
    };

    // 테이블 추가 함수
    const addTable = () => {
        const margin = 20;
        const tableSize = 100;
        const initialX = (tableCount * (tableSize + margin)) % tableAreaWidth;
        const initialY = Math.floor((tableCount * (tableSize + margin)) / tableAreaWidth) * (tableSize + margin);

        const newTable: Table = {
            id: tableCount + 1,
            name: `Table ${tableCount + 1}`,
            token: generateToken(),
            x: initialX,
            y: initialY,
        };
        setTables([...tables, newTable]);
        setTableCount(tableCount + 1);
    };

    const showQRCode = (token: string) => {
        const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(token)}`;
        setQRCodeURL(qrCodeURL);
        setIsQRCodeLoaded(false);
        setIsQRCodeVisible(true);
    };

    // QR 코드 닫기 함수
    const hideQRCode = () => {
        setIsQRCodeVisible(false);
        setQRCodeURL('');
    };

    // 토큰 보기 함수
    const showToken = (token: string) => {
        Alert.alert('토큰', token, [{ text: '확인', style: 'cancel' }]);
    };

    // 테이블 위치 업데이트 함수
    const updateTablePosition = (id: number, x: number, y: number) => {
        setTables(tables.map((table) =>
            table.id === id ? { ...table, x, y } : table
        ));
    };

    // 테이블 삭제 함수
    const removeTable = (id: number) => {
        Alert.alert(
            '삭제 확인',
            '정말로 이 테이블을 삭제하시겠습니까?',
            [
                { text: '취소', style: 'cancel' },
                {
                    text: '삭제',
                    onPress: () => setTables(tables.filter((table) => table.id !== id))
                },
            ]
        );
    };

    // 이동 모드 토글 함수
    const toggleMoveMode = () => {
        setIsMoveMode(!isMoveMode);
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <ImageBackground
                source={{ uri: 'https://github.com/24HF063orderflow/Image/blob/main/Main/ManagerIcon/back2.png?raw=true' }}
                style={styles.fullScreenImage}
                resizeMode="stretch"
            
            >
                                <TouchableOpacity
                    onPress={() => handlePress('ManagerMain')}
                    style={styles.backBtn}
                >
                    <Image
                        source={require('../assets/images/backbutton.png')}  // 뒤로가기 버튼 이미지 사용
                        style={styles.backButtonImage}
                    />
                </TouchableOpacity>
                <View style={{ width: '100%', height: '17%', flexDirection: 'row' }}>
                    <View style={{ width: '15%', height: '80%', flexDirection: 'row' }}>
                        <ImageBackground
                            source={{ uri: 'https://github.com/24HF063orderflow/Image/blob/main/Main/logo.png?raw=true' }}
                            style={styles.fullScreenImage}
                            resizeMode="stretch"
                        />
                    </View>
                </View>
                <View style={{ width: '100%', height: '85%', flexDirection: 'row' }}>
                    <View style={{ width: '80%', height: '100%', flexDirection: 'column' }}>
                        <View style={styles.tableArea}>
                            {tables.map((table) => (
                                <Draggable
                                    key={table.id}
                                    x={table.x}
                                    y={table.y}
                                    disabled={!isMoveMode}
                                    onDragRelease={(e, gestureState) => {
                                        const newX = gestureState.moveX - 50;
                                        const newY = gestureState.moveY - 50;
                                        updateTablePosition(table.id, newX, newY);
                                    }}
                                >
                                    <View style={[styles.table, table.checked && styles.checkedTable]}>
                                        <Text style={styles.tableText}>{table.name}</Text>
                                        <TouchableOpacity style={styles.tableButton} onPress={() => showToken(table.token)}>
                                            <Text style={styles.buttonText}>토큰 보기</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.tableButton} onPress={() => showQRCode(table.token)}>
                                            <Text style={styles.buttonText}>QR 코드 보기</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.tableButton} onPress={() => removeTable(table.id)}>
                                            <Text style={styles.buttonText}>삭제</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Draggable>
                            ))}
                        </View>
                    </View>
                    <View style={{ width: '20%', height: '100%', flexDirection: 'column' }}>
                        <View style={{ width: '100%', height: '20%', flexDirection: 'column' }}>
                            <TouchableOpacity style={styles.addButton} onPress={addTable}>
                                <Text style={styles.addButtonText}>테이블 추가</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '100%', height: '20%', marginTop: '1%', flexDirection: 'column' }}>
                            <TouchableOpacity style={styles.addButton} onPress={toggleMoveMode}>
                                <Text style={styles.addButtonText}>
                                    {isMoveMode ? "테이블 이동종료" : "테이블 이동"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>

            {isQRCodeVisible && (
                <View style={styles.qrCodeOverlay}>
                    {qrCodeURL ? (
                        <Image
                            source={{ uri: qrCodeURL }}
                            style={styles.qrCodeImage}
                            resizeMode="contain"
                            onLoad={() => setIsQRCodeLoaded(true)}
                            onError={(error) => {
                                console.log("QR Code image loading error", error.nativeEvent);
                                Alert.alert("Error", "QR 코드를 불러오지 못했습니다.");
                            }}
                        />
                    ) : (
                        <Text>로딩 중...</Text>
                    )}
                    <TouchableOpacity style={styles.closeButton} onPress={hideQRCode}>
                        <Text style={styles.closeButtonText}>닫기</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    fullScreenImage: {
        width: '100%',
        height: '100%',
    },
    addButton: {
        backgroundColor: '#b5a883',
        width: '100%',
        height: '100%',
        borderRadius: 10,
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%',
        textAlign: 'center',
    },
    tableArea: {
        flex: 1,
        position: 'relative',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#EEEEEE',
        opacity: 0.9
    },
    table: {
        width: 150,
        height: 150,
        backgroundColor: '#ffe071',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    tableText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    tableButton: {
        backgroundColor: '#607D8B',
        padding: 5,
        borderRadius: 5,
        marginVertical: 2,
        width: '70%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 12,
    },
    qrCodeOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },    backBtn: {
        position: 'absolute',  // 버튼을 고정 위치로 설정
        top: 30,  // 화면 상단에서 30px 떨어지게 설정
        right: 20,  // 화면 오른쪽에서 20px 떨어지게 설정
        zIndex: 1,  // 버튼이 다른 컴포넌트 위에 나타나도록 설정
    },
    backButtonImage: {
        width: 25,
        height: 25,
        resizeMode: 'contain',  // 이미지를 적절히 크기에 맞춰 조정
    },
    qrCodeImage: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: '#b5a883',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },    checkedTable: {
      backgroundColor: 'red',  // 테이블이 선택되었을 때의 배경색
  },
});

export default TableManager;