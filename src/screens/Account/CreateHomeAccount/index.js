import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../../provider/AppProvider'
import { useForm, Controller } from 'react-hook-form'
import { Dimensions, View, TextInput } from 'react-native';

import { Container, Header, Content, Button, Form, Item, Input, Title, H2, ListItem, Text, Radio, Left, Right } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Modal from '../../components/MessageModal';
import AppFooter from '../../../components/Footer'
import Modal  from "../../../components/MessageModal";
import { Col, Row, Grid } from 'react-native-easy-grid';


const CreateHomeAccount = (props) => {

    const state = useContext(AppContext);
    const [accountType, setAccountType] = React.useState(2);
    const { control, handleSubmit, errors } = useForm();

    const { height: screenHeight } = Dimensions.get('window');
    const radioItem = [
        { label: 'Aile', value: 1 },
        { label: 'Ev Arkadaşları', value: 2 }
    ];

    const onSubmit = (data) => {

        let accountModel = {
            hesapAd: data.accountName,
            hesapTurID: accountType,
            hesapAktifDurum: true
        }
        if (accountModel != null) {
            var result = state.createAccount(accountModel)
            console.log(result)
            if (result) {
                props.navigation.navigate('CommonAccounts')
            }
        }
        else {
            console.log("hata account");
        }
    }

    return (

        <Container >
            <Header />
            <Content >
                <View style={{ flex: 1, height: screenHeight, justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center' }}>
                        <H2 style={{ color: 'gray', marginBottom: 50 }}>Yeni Ortak Hesap Oluştur</H2>
                    </View>

                    <View style={{ margin: 30 }}>
                        <Item style={{ marginLeft: 20, marginRight: 30, marginBottom: 15, padding: 5 }}>
                            <Controller
                                control={control} name="accountName" rules={{ required: true }} defaultValue=""
                                render={({ onChange, onBlur, value }) => (
                                    <TextInput onChangeText={value => onChange(value)} value={value} placeholder='İsim' style={{ fontSize: 20 }} />
                                )}
                            />
                        </Item >
                        {errors.accountName && <Text style={{ color: 'red', marginLeft: 25 }}>Lütfen bir ev adı giriniz !</Text>}

                        <View style={{ margin: 20, padding: 5 }}>

                            <Text >Hesap Tipi Seçiniz</Text>
                            {
                                radioItem.map((data, key) => {
                                    return (
                                        <ListItem key={key}>

                                            <Left>
                                                <Text style={{ color: 'dimgray' }}>{data.label}</Text>
                                            </Left>
                                            <Right>
                                                <Radio
                                                    onPress={() => setAccountType(data.value)}
                                                    color={"gray"}
                                                    selectedColor={"darkseagreen"}
                                                    selected={data.value === accountType}
                                                />
                                            </Right>
                                        </ListItem>
                                    )
                                })
                            }
                        </View>
                        <Button block rounded style={{ margin: 30, backgroundColor: 'darkseagreen' }} onPress={handleSubmit(onSubmit)}  ><Text>Oluştur</Text></Button>
                    </View>
                </View>
                <Modal />

            </Content>
            <AppFooter {...props} />
        </Container>
    );
}

//            slateblue                    <Col style={{ backgroundColor: '#00CE9F', height: 200 }}></Col>

export default CreateHomeAccount;
