const ContentIds = Object.freeze({
    materi: 0,
    laporan: 1,
    dokumentasi: 2,
    tentangKami: 3
});

const Content = {
    currentActive: -1,
    elementTransitionDuration: 0,

    main: null,

    materi: {
        div: null,
        button: null,
        buttonDropDown: null,
        oldScrollTop: 0
    },
    laporan: {
        div: null,
        button: null,
        buttonDropDown: null,
        oldScrollTop: 0
    },
    dokumentasi: {
        div: null,
        button: null,
        buttonDropDown: null,
        oldScrollTop: 0
    },
    tentangKami: {
        div: null,
        button: null,
        buttonDropDown: null,
        oldScrollTop: 0
    },

    unactivateContent: async function () {
        let div, button;

        switch (this.currentActive) {
            case ContentIds.materi:
                div = this.materi.div;
                button = this.materi.button;
                buttonDropDown = this.materi.buttonDropDown;
                this.materi.oldScrollTop = this.main.scrollTop;
                break;
            
            case ContentIds.laporan:
                div = this.laporan.div;
                button = this.laporan.button;
                buttonDropDown = this.laporan.buttonDropDown;
                this.laporan.oldScrollTop = this.main.scrollTop;
                break;
            
            case ContentIds.dokumentasi:
                div = this.dokumentasi.div;
                button = this.dokumentasi.button;
                buttonDropDown = this.dokumentasi.buttonDropDown;
                this.dokumentasi.oldScrollTop = this.main.scrollTop;
                break;
            
            case ContentIds.tentangKami:
                div = this.tentangKami.div;
                button = this.tentangKami.button;
                buttonDropDown = this.tentangKami.buttonDropDown;
                this.tentangKami.oldScrollTop = this.main.scrollTop;
                break;
        
            default:
                return;
        }

        div.classList.remove("active");
        button.classList.remove("active");
        buttonDropDown.classList.remove("active");
    },

    activateContent: async function (contentId) {
        if (this.currentActive == contentId) { return; }

        await this.unactivateContent();

        let div, button, buttonDropDown, oldScrollTop = 0;

        switch (contentId) {
            case ContentIds.materi:
                div = this.materi.div;
                button = this.materi.button;
                buttonDropDown = this.materi.buttonDropDown;
                oldScrollTop = this.materi.oldScrollTop;
                break;
            
            case ContentIds.laporan:
                div = this.laporan.div;
                button = this.laporan.button;
                buttonDropDown = this.laporan.buttonDropDown;
                oldScrollTop = this.laporan.oldScrollTop;
                break;
            
            case ContentIds.dokumentasi:
                div = this.dokumentasi.div;
                button = this.dokumentasi.button;
                buttonDropDown = this.dokumentasi.buttonDropDown;
                oldScrollTop = this.dokumentasi.oldScrollTop;
                break;
            
            case ContentIds.tentangKami:
                div = this.tentangKami.div;
                button = this.tentangKami.button;
                buttonDropDown = this.tentangKami.buttonDropDown;
                oldScrollTop = this.tentangKami.oldScrollTop;
                break;
        
            default:
                return;
        }

        div.classList.add("active");
        button.classList.add("active");
        buttonDropDown.classList.add("active");

        this.main.scrollTop = oldScrollTop;

        this.currentActive = contentId;
    },

    init: function () {
        const buttons = document.getElementsByClassName("content-switcher");
        const buttonDropDowns = document.getElementsByClassName("content-switcher-drop-down");

        for (let i = 0; i < buttons.length; i++) {
            const button = buttons[i];
            const buttonDropDown = buttonDropDowns[i];

            const dataTarget = button.getAttribute("data-target");
            const convertedDataTarget = dataTarget == "tentang-kami" ? "tentangKami" : dataTarget;

            Content[convertedDataTarget].div = document.getElementById(dataTarget);
            Content[convertedDataTarget].button = button;
            Content[convertedDataTarget].buttonDropDown = buttonDropDown;

            buttonDropDown.setAttribute("onclick", "Content.activateContent(" + ContentIds[convertedDataTarget] + ");");
            button.setAttribute("onclick", "Content.activateContent(" + ContentIds[convertedDataTarget] + ");");
        }

        this.elementTransitionDuration = parseInt(getComputedStyle(this.materi.div).transitionDuration);
        this.main = document.getElementsByTagName("main")[0];
        this.activateContent(ContentIds.materi);
    }
}