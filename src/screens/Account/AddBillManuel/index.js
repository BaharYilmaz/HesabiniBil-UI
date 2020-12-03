import React, { useContext, useState } from 'react';
import { AppContext } from '../../../provider/AppProvider'
import { useForm, Controller } from 'react-hook-form'
import { Dimensions, View, Alert, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Button, Form, Item, Input, Title, H2, Left, Text, Body, Right, List, ListItem, } from 'native-base';
import { Icon } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppFooter from '../../../components/Footer'


//this.props.navigation.goBack();
const AddBillManuel = (props) => {

    const { control, handleSubmit, errors, formState, reset, setValue } = useForm();
    const state = useContext(AppContext);
    const [product, setProduct] = useState([])
    const [productList, setList] = useState([])

    const params = props.route.params;

    const onSubmit = (data) => {
        var productId = 0
        if (product.length > 0) {
            productId = product[product.length - 1].urunId
        }
        let model = {
            urunAd: data.productName,
            urunFiyat: data.productCost,
            urunId: ++productId
        }
        let apiModel={
            urunAd: data.productName,
            urunFiyat: parseFloat(data.productCost), 
        }
        setProduct(prevArray => [...prevArray, model])
        setList(prevArray => [...prevArray, apiModel])

        //reset()
        setValue('productName', '')
        setValue('productCost', '')

    }
    const deleteProduct = (id) => {
        setProduct(product.filter((item) => (item.productId !== id)));
    }
    const saveBill = () => {
        let model={
            ortakHesapID:params.account,
            alisverisFoto:'',
            alisverisFisDetay:productList,
        }
        state.addBill(model)
        props.navigation.navigate('HomeAccount')

    }

    const { height: screenHeight } = Dimensions.get('window');

    return (

        <Container style={{ height: screenHeight }}>
            <Header>
                <Left>
                    <Button transparent onPress={() => props.navigation.navigate('HomeAccount')}>
                        <Icon name='angle-left' type='font-awesome' size={hp('5%')} color="white" />
                    </Button>
                </Left>
                <Body />

            </Header>
            <View style={{ margin: wp('3%'), padding: wp('3%'), borderColor: 'lightgray', borderWidth: 2, borderRadius: 5 }}>
                <Item style={styles.item}>
                    <Controller
                        control={control} name="productName" rules={{ required: true }} defaultValue=""
                        render={({ onChange, value }) => (
                            <TextInput onChangeText={value => onChange(value)} value={value} placeholder='Ürün adı (örn: 250 gr peynir)' style={styles.text} />
                        )}
                    />
                </Item >
                {errors.productName && <Text style={styles.errorText}>Lütfen detaylı ürün adını giriniz !</Text>}

                <Item style={styles.item}>
                    <Controller
                        control={control} name="productCost" defaultValue="" rules={{ required: true, pattern: { value: /^(\d*\.?\d*)$/ } }}
                        render={({ onChange, value }) => (
                            <TextInput onChangeText={value => onChange(value)} value={value} placeholder='Ürün fiyatı (örn: 8.99)' style={styles.text} />
                        )}
                    />
                </Item>
                {errors.productCost && <Text style={styles.errorText}>Lütfen ürün fiyatını TL cinsinden giriniz !</Text>}
                <TouchableOpacity style={{ marginTop: hp('3%'), alignSelf: 'center' }} onPress={handleSubmit(onSubmit)} ><Text style={{ textDecorationLine: 'underline', color: 'slateblue' }}>Fişe Ekle</Text></TouchableOpacity>

            </View>
            <Text style={{ alignSelf: 'center', color: 'crimson', marginTop: wp('5') }}>FİŞ LİSTESİ</Text>
            <View style={styles.divider} />
            <Text style={{ fontStyle: 'italic', color: 'gray', alignSelf: "center" }}>Listeyi tamamladıktan sonra kaydetmeyi unutmayınız...</Text>
            <Text style={{ fontStyle: 'italic', color: 'gray', alignSelf: "center" }}>Toplam eklenen: {product.length}</Text>



            <Content>
                <View style={{ height: screenHeight * 0.7, marginVertical: wp('5%') }}>
                    <View >

                        <List >
                            <ScrollView>
                                {
                                    product.map(list =>
                                        <ListItem thumbnail key={list.urunId} style={{ marginHorizontal: wp('2%') }}>
                                            <Body style={{ flexDirection: 'row' }}>
                                                <Text style={{ color: 'crimson' }}>Ürün :</Text>
                                                <Text note numberOfLines={1}>{list.urunAd}   {list.urunFiyat} TL  </Text>

                                            </Body>
                                            <Right>
                                                <TouchableOpacity onPress={() => deleteProduct(list.urunId)}>
                                                    <Text style={{ color: 'crimson' }}>X</Text>
                                                </TouchableOpacity>
                                            </Right>

                                        </ListItem>
                                    )
                                }
                            </ScrollView>
                        </List>
                    </View>
                </View>
            </Content>
            { product.length > 0 ?
                <Button rounded style={{ marginVertical: hp('3%'), alignSelf: 'center', backgroundColor: 'crimson' }} onPress={saveBill} ><Text>Fişi Kaydet</Text></Button>
                : <Text style={{ marginBottom: hp('10%'), alignSelf: 'center', color: 'gray' }}>Liste Boş...</Text>
            }
            <AppFooter />
        </Container>
    );
}


export default AddBillManuel;

const styles = StyleSheet.create({

    item: {
        marginTop: wp('5%')
    },
    text: {
        fontSize: 15
    },
    errorText: {
        color: 'red', marginLeft: 10
    },
    divider: {
        height: 2,
        backgroundColor: 'crimson',
        marginHorizontal: wp('3%'),
        marginVertical: wp('1%')
    }
})