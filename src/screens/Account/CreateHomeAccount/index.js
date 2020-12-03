import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../../provider/AppProvider'
import { useForm, Controller } from 'react-hook-form'
import { Dimensions, View, TextInput, StyleSheet } from 'react-native';
import { Container, Header, Content, Button, Form, Item, Input, Title, H2, ListItem, Text, Radio, Left, Right } from 'native-base';
import AppFooter from '../../../components/Footer'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { height: screenHeight } = Dimensions.get('window');

const CreateHomeAccount = (props) => {

    const state = useContext(AppContext);
    const [accountType, setAccountType] = React.useState(2);
    const { control, handleSubmit, errors } = useForm();

   
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
            state.createAccount(accountModel)
            props.navigation.navigate('CommonAccounts')
            // console.log("res",result)
            // if (result) {
            //     props.navigation.navigate('CommonAccounts')
            // }
        }
        else {
            console.log("hata account");
        }
    }

    return (

        <Container style={styles.container}>
            <Header />
            <Content  >
                <View style={{ flex: 1, height: screenHeight * 0.8, justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center', margin: hp('3%') }}>
                        <H2 style={{ color: 'darkseagreen' }}>Yeni Ortak Hesap Oluştur</H2>
                    </View>

                    <View style={styles.formContainer}>
                        <Item style={{ marginLeft: wp('5%'), marginRight: wp('5%') }}>
                            <Controller
                                control={control} name="accountName" rules={{ required: true }} defaultValue=""
                                render={({ onChange, onBlur, value }) => (
                                    <TextInput onChangeText={value => onChange(value)} value={value} placeholder='Hesap Adı' style={{ fontSize: wp('4%') }} />
                                )}
                            />
                        </Item >
                        {errors.accountName && <Text style={{ color: 'red', marginLeft: wp('7%') }}>Lütfen bir ev adı giriniz !</Text>}

                        <View style={{ margin: wp('5%'), padding: wp('2%') }}>

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

            </Content>
            <AppFooter {...props} />
        </Container>
    );
}


export default CreateHomeAccount;
const styles = StyleSheet.create({

    container: {
        flex: 1, height: screenHeight, justifyContent: 'center'
    },
    formContainer: {
        margin: hp('2%'), padding: hp('2%'), borderColor: 'lightgray', borderWidth: 1, borderRadius: 4
    }
})