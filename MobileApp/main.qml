import QtQuick 2.12
import QtQuick.Controls 2.5

ApplicationWindow {
    width: 480
    height: 640
    visible: true
    title: qsTr("FoxhoundClient")

    SwipeView {
        id: swipeView
        anchors.fill: parent
        currentIndex: tabBar.currentIndex

        Page {

        }

        Page {
        }
    }

    footer: TabBar {
        id: tabBar
        currentIndex: swipeView.currentIndex

        TabButton {
            text: qsTr("Параметры")
        }
        TabButton {
            text: qsTr("Рекомендации")
        }
    }
}
