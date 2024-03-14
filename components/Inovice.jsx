import {Document, Text, Page, StyleSheet, Image} from "@react-pdf/renderer"

const styles = StyleSheet.create({
    page :{
        backgroundColor : "#00000"
    }

})

const Inovice = () => {
  return (
    <Document>
        <Page>
            <Image src="/harbor-171-logo.svg" alt="Logo Harbor 171" />
        </Page>
    </Document>
  )
}

export default Inovice