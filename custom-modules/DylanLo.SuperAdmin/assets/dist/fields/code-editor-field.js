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
                    title: this.model.value ? this.language.toUpperCase() : ''
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
            switch (this.language) {
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
        this.codeEditor = CodeMirror.fromTextArea(document.getElementById(this.uid + "-code"), {
            ...commonOptions
        });
        this.codeEditor.on("change", this.onChange);

        // Set initial value
        this.codeEditor.setValue(this.model.value || "");
        
        // Reset dirty flag after initial setup
        this.isDirty = false;
        
        // Focus the editor
        this.$nextTick(() => {
            if (this.codeEditor) {
                this.codeEditor.focus();
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
        <div class="code-editor-field" :class="{ empty: isEmpty, 'is-dirty': isDirty }">
            <div class="code-editor-header">
                <button type="button" class="btn btn-sm btn-light" @click.prevent="formatCode()" title="Format Code">
                    <i class="fas fa-indent"></i> Format Code
                </button>
            </div>
            <div class="code-editor-content">
                <textarea :id="uid + '-code'" v-model="model.value"></textarea>
            </div>
            <div class="code-editor-footer">
                <div class="d-flex justify-content-between align-items-center px-2 py-1">
                    <small class="text-muted">
                        {{ language.toUpperCase() }} | Line: {{ lineCount }} | Characters: {{ charCount }}
                    </small>
                    <small class="text-muted">
                        <kbd>Ctrl+Space</kbd>: Autocomplete | 
                        <kbd>Ctrl+F</kbd>: Find | 
                        <kbd>Ctrl/</kbd>: Comment | 
                        <kbd>F11</kbd>: Fullscreen
                    </small>
                </div>
            </div>
        </div>
    `
});