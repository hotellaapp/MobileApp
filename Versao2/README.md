
How to run project:

npm install

react-native run-android


Generate pkg file:

keytool -genkey -v -keystore mykeystore.keystore -alias mykeyalias -keyalg RSA -keysize 2048 -validity 10000 (run 1 time and config android/gradle.properties file accordingly)

cd android && ./gradlew assembleRelease