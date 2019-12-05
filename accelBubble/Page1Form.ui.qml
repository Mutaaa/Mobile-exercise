import QtQuick 2.8
import QtQuick.Controls 2.1

Page {
    width: 600
    height: 400
    property alias bubble: bubble
    property alias mainWindow: mainWindow

    header: Label {
        text: qsTr("Page 1")
        font.pixelSize: Qt.application.font.pixelSize * 2
        padding: 10
    }

    Rectangle {
        id: mainWindow
        color: "#ffffff"
        anchors.fill: parent

        Bubble {
            id: bubble
        }
    }
}
