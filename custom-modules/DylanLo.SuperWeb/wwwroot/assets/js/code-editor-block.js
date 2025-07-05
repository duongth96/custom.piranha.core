/**
 * CodeEditorBlock Frontend Script
 * 
 * This script enhances the CodeEditorBlock display in the frontend by adding
 * syntax highlighting using Prism.js (if available) and handling tab switching.
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize syntax highlighting if Prism is available
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }

    // Handle tab switching
    const tabLinks = document.querySelectorAll('.code-editor-block .nav-link');
    
    tabLinks.forEach(function(tabLink) {
        tabLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target tab
            const targetId = this.getAttribute('href');
            const targetTab = document.querySelector(targetId);
            
            if (!targetTab) return;
            
            // Get the parent tab container
            const tabContainer = this.closest('.code-tabs');
            if (!tabContainer) return;
            
            // Remove active class from all tabs and tab links
            tabContainer.querySelectorAll('.tab-pane').forEach(function(tab) {
                tab.classList.remove('show', 'active');
            });
            
            tabContainer.querySelectorAll('.nav-link').forEach(function(link) {
                link.classList.remove('active');
            });
            
            // Add active class to the selected tab and tab link
            targetTab.classList.add('show', 'active');
            this.classList.add('active');
        });
    });

    // Add copy button functionality if clipboard API is available
    if (navigator.clipboard) {
        const codeBlocks = document.querySelectorAll('.code-editor-block pre code');
        
        codeBlocks.forEach(function(codeBlock) {
            // Create copy button
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button';
            copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg>';
            copyButton.title = 'Copy to clipboard';
            
            // Add button to the code block container
            const preElement = codeBlock.parentElement;
            preElement.style.position = 'relative';
            preElement.appendChild(copyButton);
            
            // Add click event to copy code
            copyButton.addEventListener('click', function() {
                const code = codeBlock.textContent;
                navigator.clipboard.writeText(code).then(function() {
                    // Show success feedback
                    copyButton.classList.add('success');
                    copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg>';
                    
                    // Reset after 2 seconds
                    setTimeout(function() {
                        copyButton.classList.remove('success');
                        copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg>';
                    }, 2000);
                }).catch(function(err) {
                    console.error('Could not copy text: ', err);
                });
            });
        });

        // Add styles for copy button
        const style = document.createElement('style');
        style.textContent = `
            .code-editor-block pre {
                position: relative;
            }
            .code-editor-block .copy-button {
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                padding: 0.25rem;
                background-color: rgba(255, 255, 255, 0.1);
                border: none;
                border-radius: 0.25rem;
                color: #6c757d;
                cursor: pointer;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 2rem;
                height: 2rem;
                opacity: 0.7;
            }
            .code-editor-block .copy-button:hover {
                background-color: rgba(255, 255, 255, 0.2);
                color: #212529;
                opacity: 1;
            }
            .code-editor-block .copy-button.success {
                background-color: rgba(40, 167, 69, 0.2);
                color: #28a745;
            }
            @media (prefers-color-scheme: dark) {
                .code-editor-block .copy-button {
                    background-color: rgba(0, 0, 0, 0.2);
                    color: #adb5bd;
                }
                .code-editor-block .copy-button:hover {
                    background-color: rgba(0, 0, 0, 0.3);
                    color: #e9ecef;
                }
                .code-editor-block .copy-button.success {
                    background-color: rgba(40, 167, 69, 0.2);
                    color: #28a745;
                }
            }
        `;
        document.head.appendChild(style);
    }
});