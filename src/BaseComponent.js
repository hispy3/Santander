import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import GlobalData from './utils/GlobalData'
import { fetchPartyPOST } from './services/FetchData';
var globalData = new GlobalData();
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
var constants = require('./config/Constants');
const SHOP_NAME = "DigiShop27"
export default class BaseComponent extends Component {

  constructor() {
    super();

  }

  setUserIdFlurry(userId) {

  }
  logEventFlurry(eventName) {

  }

  componentDidMount() {

  }
  isValidArray(dataArray) {
    if (dataArray != '' && dataArray != undefined && dataArray.length > 0) {
      return true;
    }
    return false;
  }

  isValidString(data) {
    if (data != '' && data != undefined && data != null && data != NaN) {
      return true;
    }
    return false;
  }

  async googleConfiguration() {
    GoogleSignin.configure({
      webClientId: (Platform.OS == 'android') ? constants.WEB_CLIENT_ID : '',
      iosClientId: (Platform.OS == 'ios') ? constants.WEB_CLIENT_ID : '',
    });
  }

  async signOut() {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      globalData.setGoogleUserInfo("");
      this.setState({ googleUserInfo: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  async isSignedIn() {
    const isSignedIn = await GoogleSignin.isSignedIn();
    return isSignedIn;
  };

  async getCurrentUser() {
    const currentUser = await GoogleSignin.getCurrentUser();
    return currentUser;
  };

  saveUserInfo(data) {
    if (this.isValidString(data) && this.isValidArray(data.properties)) {
      let userInfo = data.properties[0].value;
      if (this.isValidString(userInfo)) {
        globalData.setUserInfo(userInfo);
        let userTokenKey = userInfo.key;
        if (this.isValidString(userTokenKey)) {
          globalData.setUserTokenKey(userTokenKey);
        }
      }
    }
  }

  async createShop() {
    let createShopBody = {
      "shopName": SHOP_NAME,
      "country": "US",
      "locale": "en_us"
    }
    var responseData = await fetchPartyPOST(constants.CREATE_SHOP_URL, createShopBody);
    if (this.isValidString(responseData) && responseData.statusMessage === constants.CREATE_SHOP_STATUS) {
      let businessId = this.getBusinessId(responseData);
      if (this.isValidString(businessId)) {
        let businessObj = {
          "businessId": businessId,
          "username": globalData.getUserInfo().username
        }
        globalData.setBusinessId(businessId)
        console.log("############# createShop businessId : " + businessId);
        let isDataSave = await this.setAsyncData(constants.ASYNC_BUSINESS_ID, JSON.stringify(businessObj));
      }

    }
  }

  getBusinessId(response) {
    if (this.isValidArray(response.properties)) {
      let shopDetail = response.properties[0];
      if (this.isValidString(shopDetail)) {
        let shopValue = shopDetail.value;
        let businessId = shopValue.businessSettings.businessId;
        return businessId;
      }
    }
  }

  async saveBusinessId(businessId) {

  };

  async setAsyncData(key, value) {
    try {
      await AsyncStorage.setItem(key, value)
      return true
    } catch (error) {
      return false
    }
  }

  getAsyncData(key) {
    return new Promise(function (resolve, reject) {
      try {
        AsyncStorage.getItem(key).then((result) => {
          resolve(result)
        })
      } catch (error) {
        resolve(undefined)
      }
    });
  }
}