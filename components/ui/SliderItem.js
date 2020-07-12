import {SafeAreaView,Dimensions, View, StyleSheet, Image} from "react-native";
import {HeadingText} from "./HeadingText";
import React from "react";
import colors from "../../constants/colors";
import {CustomText} from "./Text";


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default ({ item }) => {
    return (
        <SafeAreaView style={{...styles.slideContainer,backgroundColor:item.backgroundColor}}>
            <View>
                <HeadingText style={styles.titleStyle}>{item.title}</HeadingText>
                <View style={styles.imageContainer}>
                    {/*<Image source={{uri:'https://reactnative.dev/img/tiny_logo.png'}} style={styles.image}/>*/}
                    <Image source={item.image} style={styles.image}
                            />
                </View>

                <CustomText style={styles.description}>
                    {item.text}
                </CustomText>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    slideContainer:{
        marginTop:30,
        height:'100%',
        backgroundColor:colors.primary
    },
    titleStyle:{
        color:'white',
        marginLeft:'auto',
        marginRight:'auto',
        marginVertical:30,
        paddingHorizontal:20,
        textAlign:'center',

    },

    image:{
        width:width/1.6,
        height:height/3.3,
        marginLeft:'auto',
        marginRight:'auto',
        marginTop: 'auto',
        marginBottom:'auto',
    },
    description:{
        color:'white',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:20,
        paddingHorizontal: 20,
        textAlign:'center'
    }


});

