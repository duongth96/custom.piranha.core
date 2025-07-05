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
    props: ["uid", "model", "meta"],
    data: function () {
        return {
            htmlEditor: null,
            cssEditor: null,
            jsEditor: null,
            activeTab: "html",
            isDirty: false
        };
    },
    methods: {
        /**
         * Sets the active tab and refreshes the corresponding editor
         * @param {string} tab - The tab to activate ("html", "css", or "js")
         */
        setTab: function (tab) {
            this.activeTab = tab;
            this.$nextTick(() => {
                if (tab === "html" && this.htmlEditor) {
                    this.htmlEditor.refresh();
                    this.htmlEditor.focus();
                } else if (tab === "css" && this.cssEditor) {
                    this.cssEditor.refresh();
                    this.cssEditor.focus();
                } else if (tab === "js" && this.jsEditor) {
                    this.jsEditor.refresh();
                    this.jsEditor.focus();
                }
            });
        },
        
        /**
         * Handles changes to the HTML editor
         * @param {CodeMirror} cm - The CodeMirror instance
         */
        onHtmlChange: function (cm) {
            this.model.value.html = cm.getValue();
            this.isDirty = true;
            this.notifyChange();
        },
        
        /**
         * Handles changes to the CSS editor
         * @param {CodeMirror} cm - The CodeMirror instance
         */
        onCssChange: function (cm) {
            this.model.value.css = cm.getValue();
            this.isDirty = true;
            this.notifyChange();
        },
        
        /**
         * Handles changes to the JavaScript editor
         * @param {CodeMirror} cm - The CodeMirror instance
         */
        onJsChange: function (cm) {
            this.model.value.js = cm.getValue();
            this.isDirty = true;
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
                    title: this.model.value.html ? 'HTML, CSS, JS' : ''
                });
            }
        },
        
        /**
         * Formats the code in the active editor
         */
        formatCode: function () {
            let editor = null;
            
            if (this.activeTab === "html" && this.htmlEditor) {
                editor = this.htmlEditor;
            } else if (this.activeTab === "css" && this.cssEditor) {
                editor = this.cssEditor;
            } else if (this.activeTab === "js" && this.jsEditor) {
                editor = this.jsEditor;
            }
            
            if (editor) {
                // Get the current content
                const content = editor.getValue();
                
                try {
                    // Format the content based on the active tab
                    let formattedContent = content;
                    
                    // Apply basic indentation formatting
                    const totalLines = editor.lineCount();
                    editor.operation(() => {
                        for (let i = 0; i < totalLines; i++) {
                            editor.indentLine(i);
                        }
                    });
                    
                    // Notify that the content has changed
                    this.isDirty = true;
                } catch (e) {
                    console.error("Error formatting code:", e);
                }
            }
        }
    },
    computed: {
        /**
         * Checks if all editors are empty
         * @returns {boolean} True if all editors are empty
         */
        isEmpty: function () {
            return !this.model.value.html && !this.model.value.css && !this.model.value.js;
        },
        
        /**
         * Gets the character count for the active editor
         * @returns {number} The number of characters in the active editor
         */
        charCount: function () {
            if (this.activeTab === "html" && this.model.value.html) {
                return this.model.value.html.length;
            } else if (this.activeTab === "css" && this.model.value.css) {
                return this.model.value.css.length;
            } else if (this.activeTab === "js" && this.model.value.js) {
                return this.model.value.js.length;
            }
            return 0;
        },
        
        /**
         * Gets the line count for the active editor
         * @returns {number} The number of lines in the active editor
         */
        lineCount: function () {
            let editor = null;
            
            if (this.activeTab === "html" && this.htmlEditor) {
                editor = this.htmlEditor;
            } else if (this.activeTab === "css" && this.cssEditor) {
                editor = this.cssEditor;
            } else if (this.activeTab === "js" && this.jsEditor) {
                editor = this.jsEditor;
            }
            
            return editor ? editor.lineCount() : 0;
        }
    },
    /**
     * Initializes the component when it's mounted
     */
    mounted: function () {
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
            extraKeys: { 
                "Ctrl-Space": "autocomplete",
                "Ctrl-F": "findPersistent",
                "Ctrl-/": (cm) => {
                    // Toggle comment
                    const selection = cm.getSelection();
                    if (selection.trim().startsWith('//') || selection.trim().startsWith('/*')) {
                        cm.uncomment(cm.getCursor("from"), cm.getCursor("to"));
                    } else {
                        cm.lineComment(cm.getCursor("from"), cm.getCursor("to"));
                    }
                },
                "F11": (cm) => {
                    // Toggle fullscreen
                    cm.setOption("fullScreen", !cm.getOption("fullScreen"));
                },
                "Esc": (cm) => {
                    // Exit fullscreen
                    if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
                }
            }
        };

        // Initialize CodeMirror for HTML
        this.htmlEditor = CodeMirror.fromTextArea(document.getElementById(this.uid + "-html"), {
            ...commonOptions,
            mode: "htmlmixed",
            autoCloseTags: true
        });
        this.htmlEditor.on("change", this.onHtmlChange);

        // Initialize CodeMirror for CSS
        this.cssEditor = CodeMirror.fromTextArea(document.getElementById(this.uid + "-css"), {
            ...commonOptions,
            mode: "css"
        });
        this.cssEditor.on("change", this.onCssChange);

        // Initialize CodeMirror for JavaScript
        this.jsEditor = CodeMirror.fromTextArea(document.getElementById(this.uid + "-js"), {
            ...commonOptions,
            mode: "javascript"
        });
        this.jsEditor.on("change", this.onJsChange);

        // Set initial values
        this.htmlEditor.setValue(this.model.value.html || "");
        this.cssEditor.setValue(this.model.value.css || "");
        this.jsEditor.setValue(this.model.value.js || "");
        
        // Reset dirty flag after initial setup
        this.isDirty = false;
        
        // Focus the active editor
        this.$nextTick(() => {
            if (this.activeTab === "html" && this.htmlEditor) {
                this.htmlEditor.focus();
            }
        });
    },
    
    /**
     * Cleans up resources when the component is destroyed
     */
    beforeDestroy: function () {
        // Clean up CodeMirror instances
        if (this.htmlEditor) {
            this.htmlEditor.off("change", this.onHtmlChange);
            this.htmlEditor.toTextArea();
            this.htmlEditor = null;
        }
        if (this.cssEditor) {
            this.cssEditor.off("change", this.onCssChange);
            this.cssEditor.toTextArea();
            this.cssEditor = null;
        }
        if (this.jsEditor) {
            this.jsEditor.off("change", this.onJsChange);
            this.jsEditor.toTextArea();
            this.jsEditor = null;
        }
    },
    template: `
        <div class="code-editor-field" :class="{ empty: isEmpty, 'is-dirty': isDirty }">
            <div class="code-editor-tabs">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: activeTab === 'html' }" href="#" @click.prevent="setTab('html')">
                            <i class="fas fa-code"></i> HTML
                            <span v-if="model.value.html" class="badge badge-light">{{ model.value.html.split('\n').length }}</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: activeTab === 'css' }" href="#" @click.prevent="setTab('css')">
                            <i class="fas fa-paint-brush"></i> CSS
                            <span v-if="model.value.css" class="badge badge-light">{{ model.value.css.split('\n').length }}</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: activeTab === 'js' }" href="#" @click.prevent="setTab('js')">
                            <i class="fab fa-js"></i> JavaScript
                            <span v-if="model.value.js" class="badge badge-light">{{ model.value.js.split('\n').length }}</span>
                        </a>
                    </li>
                    <li class="nav-item ml-auto">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-light" @click.prevent="formatCode()" title="Format Code">
                                <i class="fas fa-indent"></i>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="code-editor-content">
                <div class="code-editor-pane" v-show="activeTab === 'html'">
                    <textarea :id="uid + '-html'" v-model="model.value.html"></textarea>
                </div>
                <div class="code-editor-pane" v-show="activeTab === 'css'">
                    <textarea :id="uid + '-css'" v-model="model.value.css"></textarea>
                </div>
                <div class="code-editor-pane" v-show="activeTab === 'js'">
                    <textarea :id="uid + '-js'" v-model="model.value.js"></textarea>
                </div>
            </div>
            <div class="code-editor-footer">
                <div class="d-flex justify-content-between align-items-center px-2 py-1">
                    <small class="text-muted">
                        <span v-if="activeTab === 'html'">HTML</span>
                        <span v-else-if="activeTab === 'css'">CSS</span>
                        <span v-else-if="activeTab === 'js'">JavaScript</span>
                        | Line: {{ lineCount }} | Characters: {{ charCount }}
                    </small>
                    <small class="text-muted">
                        <kbd>Ctrl+Space</kbd>: Autocomplete | 
                        <kbd>Ctrl+F</kbd>: Find | 
                        <kbd>Ctrl+/</kbd>: Comment | 
                        <kbd>F11</kbd>: Fullscreen
                    </small>
                </div>
            </div>
        </div>
    `
});