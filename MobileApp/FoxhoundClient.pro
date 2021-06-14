QT += quick

CONFIG += c++11

# You can make your code fail to compile if it uses deprecated APIs.
# In order to do so, uncomment the following line.
#DEFINES += QT_DISABLE_DEPRECATED_BEFORE=0x060000    # disables all the APIs deprecated before Qt 6.0.0

SOURCES += \
        main.cpp

RESOURCES += qml.qrc

win32 {
    DESTDIR = build_win
    OBJECTS_DIR = build_tmp/obj
}
android {
    DESTDIR = build_android
}

MOC_DIR = build_tmp/moc
RCC_DIR = build_tmp/rcc
UI_DIR = build_tmp/ui

# Additional import path used to resolve QML modules in Qt Creator's code model
QML_IMPORT_PATH =

# Additional import path used to resolve QML modules just for Qt Quick Designer
QML_DESIGNER_IMPORT_PATH =

# Default rules for deployment.
qnx: target.path = /tmp/$${TARGET}/bin
else: unix:!android: target.path = /opt/$${TARGET}/bin
!isEmpty(target.path): INSTALLS += target

QMAKE_EXTRA_TARGETS += before_build makefilehook
makefilehook.target = $(MAKEFILE)
makefilehook.depends = .beforebuild
PRE_TARGETDEPS += .beforebuild
before_build.target = .beforebuild
before_build.depends = FORCE
before_build.commands = chcp 1251
android: include(C:/Users/1PC/AppData/Local/Android/Sdk/android_openssl/openssl.pri)

DISTFILES += \
    android/AndroidManifest.xml \
    android/build.gradle \
    android/gradle.properties \
    android/gradle/wrapper/gradle-wrapper.jar \
    android/gradle/wrapper/gradle-wrapper.properties \
    android/gradlew \
    android/gradlew.bat \
    android/res/values/libs.xml

ANDROID_PACKAGE_SOURCE_DIR = $$PWD/android
