/*global
    piranha
*/

/**
 * Code Editor Field Component
 * 
 * A Vue component that provides a tabbed interface for editing HTML, CSS, and JavaScript code
 * using CodeMirror for syntax highlighting and code completion.
 */
Vue.component("code-editor-field", {
    props: ["uid", "model", "meta", "language"],
    data: function () {
        return {
            codeEditor: null,
            initialValue: this.model.value || "", // Set initial value from model
            isDirty: false,
            mode: "",
            charCount: 0,
            lineCount: 0
        };
    },
    methods: {
        /**
         * Handles changes to the editor
         * @param {CodeMirror} cm - The CodeMirror instance
         */
        onChange: function (cm) {
            this.model.value = cm.getValue();
            this.isDirty = true;
            this.charCount = cm.getValue().length;
            this.lineCount = cm.lineCount();
            this.notifyChange();
        },
        
        /**
         * Notifies the parent component that the field has changed
         */
        notifyChange: function () {
            // Check if we should notify parent component about title changes
            if (this.meta && this.meta.notifyChange) {
                this.$emit('update-title', {
                    uid: this.uid,
                    title: this.model.value && this.language ? this.language.toUpperCase() : ''
                });
            }
        },
        
        /**
         * Formats the code in the editor
         */
        formatCode: function () {
            if (this.codeEditor) {
                // Apply basic indentation formatting
                const totalLines = this.codeEditor.lineCount();
                this.codeEditor.operation(() => {
                    for (let i = 0; i < totalLines; i++) {
                        this.codeEditor.indentLine(i);
                    }
                });
                
                // Notify that the content has changed
                this.isDirty = true;
            }
        },
        
        /**
         * Sets the editor mode based on the language prop
         */
        setMode: function () {
            switch (this.meta.placeholder) {
                case "html":
                    this.mode = "htmlmixed";
                    break;
                case "css":
                    this.mode = "css";
                    break;
                case "js":
                    this.mode = "javascript";
                    break;
                case "xml":
                    this.mode = "xml";
                    break;
                default:
                    this.mode = ""; // Plain text or other default
            }
        }
    },
    computed: {
        /**
         * Checks if the editor is empty
         * @returns {boolean} True if the editor is empty
         */
        isEmpty: function () {
            return !this.model.value;
        }
    },
    /**
     * Initializes the component when it's mounted
     */
    mounted: function () {
        
        this.setMode();

        this.$watch('model.value', (newValue) => {
            if (this.codeEditor && newValue !== this.codeEditor.getValue()) {
                this.codeEditor.setValue(newValue || "");
            }
        });

        this.$watch('language', (newLanguage, oldLanguage) => {
            if (newLanguage !== oldLanguage) {
                this.setMode();
                if (this.codeEditor) {
                    this.codeEditor.setOption("mode", this.mode);
                }
            }
        });

        // Common CodeMirror options
        const commonOptions = {
            lineNumbers: true,
            indentUnit: 4,
            indentWithTabs: false,
            theme: "material",
            tabMode: "indent",
            lineWrapping: true,
            autoCloseBrackets: true,
            matchBrackets: true,
            mode: this.mode,
            extraKeys: { 
                "Ctrl-Space": "autocomplete",
                "Ctrl-F": "findPersistent",
                "Ctrl-/": (cm) => {
                    // Comment/uncomment selected lines
                    const ranges = cm.listSelections();
                    for (let i = 0; i < ranges.length; i++) {
                        const range = ranges[i];
                        cm.toggleComment(range.from, range.to);
                    }
                }
            }
        };

        // Initialize CodeMirror for the single editor
        this.$nextTick(async () => {
            // Wait for DOM to be fully updated
            await Vue.nextTick();
            
            let el = document.getElementById(this.uid + '-editor');

            if (!el) {
                console.warn('Code editor textarea element not found');
                return;
            }

            try {
                this.codeEditor = CodeMirror.fromTextArea(el, {
                    ...commonOptions
                });
                
                this.codeEditor.on("change", this.onChange);

                // Set initial value
                this.codeEditor.setValue(this.initialValue);

                // Set initial character and line counts  
                this.charCount = this.codeEditor.getValue().length;
                this.lineCount = this.codeEditor.lineCount();

                // Reset dirty flag after initial setup
                this.isDirty = false;

                // Focus the editor
                //this.codeEditor.focus();
            } catch (err) {
                console.error('Error initializing code editor:', err);
            }
        });
    },
    
    /**
     * Cleans up resources when the component is destroyed
     */
    beforeDestroy: function () {
        // Clean up CodeMirror instance
        if (this.codeEditor) {
            this.codeEditor.off("change", this.onChange);
            this.codeEditor.toTextArea();
            this.codeEditor = null;
        }
    },
    template: `
        <div class="code-editor-field">
            <textarea :id="uid + '-editor'"></textarea>
        </div>

    `
});