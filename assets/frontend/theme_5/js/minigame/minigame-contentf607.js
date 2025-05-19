function handleTocPosition() {
    let tocHtml = '<div id="toctoc" class="toc-container d-none"></div>';
    $(tocHtml).insertBefore( $(".minigame-content-js h2").first());
}

$('#viewMore').on('shown.bs.modal', function (e) {
    $('#viewMore').find('.data-content-minigame').toggleClass('minigame-content-js',true);
    handleTocPosition();
    if ( $(".minigame-content-js h2").length >= 2) {
        $.toctoc( {
            opened: false,
            target: '.minigame-content-js',
            smooth: true,
            headText: 'Mục lục',
            headLinkText: ['<i class="fas fa-expand-arrows-alt"></i>', '<i class="fas fa-compress-arrows-alt"></i>'],
            headBackgroundColor: 'transparent',
        });
    }
})
