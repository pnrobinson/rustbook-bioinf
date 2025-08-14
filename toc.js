// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="title-page.html"><strong aria-hidden="true">1.</strong> Die Programmiersprache Rust</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="foreword.html"><strong aria-hidden="true">1.1.</strong> Vorwort</a></li><li class="chapter-item expanded "><a href="ch00-00-introduction.html"><strong aria-hidden="true">1.2.</strong> Einführung</a></li><li class="chapter-item expanded "><a href="ch00-01-vscode.html"><strong aria-hidden="true">1.3.</strong> VS Code</a></li><li class="chapter-item expanded "><a href="ch00-02-installation.html"><strong aria-hidden="true">1.4.</strong> Installation</a></li><li class="chapter-item expanded "><a href="ch00-03-extensions.html"><strong aria-hidden="true">1.5.</strong> VS Code Extensions</a></li></ol></li><li class="chapter-item expanded "><a href="ch01-00-getting-started.html"><strong aria-hidden="true">2.</strong> Erste Schritte</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch01-02-hello-world.html"><strong aria-hidden="true">2.1.</strong> Hallo Welt</a></li><li class="chapter-item expanded "><a href="ch01-03-klassen.html"><strong aria-hidden="true">2.2.</strong> Klassen..?</a></li><li class="chapter-item expanded "><a href="ch01-04-enums.html"><strong aria-hidden="true">2.3.</strong> enums..?</a></li><li class="chapter-item expanded "><a href="ch01-05-option.html"><strong aria-hidden="true">2.4.</strong> Optional..?</a></li><li class="chapter-item expanded "><a href="ch01-06-match.html"><strong aria-hidden="true">2.5.</strong> match</a></li><li class="chapter-item expanded "><a href="ch01-07-except.html"><strong aria-hidden="true">2.6.</strong> except</a></li><li class="chapter-item expanded "><a href="ch01-08-interface.html"><strong aria-hidden="true">2.7.</strong> interface</a></li></ol></li><li class="chapter-item expanded "><a href="ch02-00-sortieren.html"><strong aria-hidden="true">3.</strong> Sortieralgorithmen</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch02-01-bubble.html"><strong aria-hidden="true">3.1.</strong> Bubblesort</a></li><li class="chapter-item expanded "><a href="ch02-02-quick.html"><strong aria-hidden="true">3.2.</strong> Quicksort</a></li></ol></li><li class="chapter-item expanded "><a href="ch03-00-fastq.html"><strong aria-hidden="true">4.</strong> FASTQ</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch03-01-phred.html"><strong aria-hidden="true">4.1.</strong> Phred-Score</a></li><li class="chapter-item expanded "><a href="ch03-02-ascii.html"><strong aria-hidden="true">4.2.</strong> ASCII-Kodierung</a></li><li class="chapter-item expanded "><a href="ch03-03-filenaming.html"><strong aria-hidden="true">4.3.</strong> Datei-Benenunng</a></li><li class="chapter-item expanded "><a href="ch03-04-readnaming.html"><strong aria-hidden="true">4.4.</strong> Read-Benenunng</a></li><li class="chapter-item expanded "><a href="ch03-05-rust.html"><strong aria-hidden="true">4.5.</strong> FASTQ-Analyse mit Rust</a></li><li class="chapter-item expanded "><a href="ch03-06-fastqc.html"><strong aria-hidden="true">4.6.</strong> FasQC in Rust</a></li></ol></li><li class="chapter-item expanded "><a href="ch04-00-sam-bam.html"><strong aria-hidden="true">5.</strong> SAM/BAM</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch04-01-basics.html"><strong aria-hidden="true">5.1.</strong> SAM-Grundlagen</a></li><li class="chapter-item expanded "><a href="ch04-02-cigar.html"><strong aria-hidden="true">5.2.</strong> CIGAR</a></li><li class="chapter-item expanded "><a href="ch04-03-clipped.html"><strong aria-hidden="true">5.3.</strong> clipped reads</a></li><li class="chapter-item expanded "><a href="ch04-04-mapingq.html"><strong aria-hidden="true">5.4.</strong> Mappingqualität</a></li><li class="chapter-item expanded "><a href="ch04-05-bitflag.html"><strong aria-hidden="true">5.5.</strong> bitflag</a></li><li class="chapter-item expanded "><a href="ch04-06-samtools.html"><strong aria-hidden="true">5.6.</strong> samtools</a></li><li class="chapter-item expanded "><a href="ch04-07-optional-sam.html"><strong aria-hidden="true">5.7.</strong> optional</a></li><li class="chapter-item expanded "><a href="ch04-08-exercises.html"><strong aria-hidden="true">5.8.</strong> Übungen</a></li><li class="chapter-item expanded "><a href="ch04-09-hints.html"><strong aria-hidden="true">5.9.</strong> Erklärungen</a></li><li class="chapter-item expanded "><a href="ch04-10-projekte.html"><strong aria-hidden="true">5.10.</strong> Projekte</a></li></ol></li><li class="chapter-item expanded "><a href="appendix-00.html"><strong aria-hidden="true">6.</strong> Anhang</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="appendix-01.html"><strong aria-hidden="true">6.1.</strong> mdbook</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
