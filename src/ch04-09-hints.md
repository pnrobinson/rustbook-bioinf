# Erklärungen

Erklärungen zu den Übungen auf der vorherigen Seite. 


# Übung 2: Erklärung

(a) Dies entspricht dem Beginn der CIGAR-Zeichenfolge <code>3M1I3M1D5M</code>
an <code>POS</code> 5, d. h. der Lesevorgang wird beginnend an Position 5 der Referenz ausgerichtet. 

Die CIGAR sagt, dass die ersten 3 Basen des Lesens  
Sequenz mit der Referenz ausrichten. Die nächste Basis des Lesevorgangs funktioniert nicht
in der Referenz (Einfügung) vorhanden sind. Dann werden 3 Basen an der Referenz ausgerichtet. Der  
Die nächste Referenzbasis ist in der Lesesequenz nicht vorhanden (Löschung), dann 5 weitere 
Basen richten sich nach der Referenz aus. Beachten Sie, dass sich bei Position 14 die Basis befindet
Der gelesene Wert unterscheidet sich vom Referenznukleotid, aber es ist immer noch so    
zählt als <code>M</code>, da es an dieser Position ausgerichtet ist. 
 
Die Sequenzinkongruenz an dieser Position betrifft sowohl die <code>NM</code>- als auch die <code>MD</code>-Tags:

Der Lese- und Referenzwert hat einen Bearbeitungsabstand von drei (daher <code>NM:i:3</code>), wobei die eingefügte Basis, die gelöschte Basis und die nicht übereinstimmende Basis gezählt werden.

Die referenzzentrierte Beschreibung der Ausrichtung lautet <code>MD:Z:6^C2A2</code>. Ab der Startposition des Alignments (fünfte Basis in der Referenz) stimmen die ersten 6 Referenzbasen mit den Basen des Lesevorgangs überein, dann fehlt ein C der Referenz im Lesevorgang (<code>^C</code>), weitere zwei Referenzbasen fehlen übereinstimmend, gefolgt von einer Nichtübereinstimmung (<code>A</code></code> in der Referenz) und zwei endgültigen Übereinstimmungen. Insertionen werden nicht im MD-Tag aufgezeichnet.
